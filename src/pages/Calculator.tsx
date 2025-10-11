import React, { useMemo, useState } from "react";

// ——————————————————————————————————————————————
// MacroCalculator — React + Tailwind, single-file component
// - Uses Katch-McArdle if body fat % provided; else Mifflin-St Jeor
// - Lets user pick units, activity, goal, protein & fat targeting styles
// - Outputs total macros + optional per‑meal split and JSON copy
// ——————————————————————————————————————————————
export default function Calculator() {

  // UI state
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<"female" | "male" | "unspecified">("female");
  const [age, setAge] = useState<number>(27);

  // Body inputs
  const [height, setHeight] = useState<number>(165); // cm or in
  const [weight, setWeight] = useState<number>(62); // kg or lb
  const [bodyFat, setBodyFat] = useState<string>(""); // % optional

  // Activity & goal
  const [activity, setActivity] = useState<number>(1.55); // Moderate default
  const [goalMode, setGoalMode] = useState<"preset" | "custom">("preset");
  const [goalPreset, setGoalPreset] = useState<"cut" | "recomp" | "bulk">("recomp");
  const [goalPercent, setGoalPercent] = useState<number>(0); // -25 .. +20

  // Macro strategy
  const [proteinMode, setProteinMode] = useState<"perkg" | "perkgLBM">("perkgLBM");
  const [proteinPerKg, setProteinPerKg] = useState<number>(1.8);

  const [fatMode, setFatMode] = useState<"perkg" | "percentCalories">("perkg");
  const [fatPerKg, setFatPerKg] = useState<number>(0.8);
  const [fatPct, setFatPct] = useState<number>(25); // % of calories

  const [meals, setMeals] = useState<number>(4);

  // Helpers
  const toKg = (w: number) => (units === "metric" ? w : w * 0.45359237);
  const toCm = (h: number) => (units === "metric" ? h : h * 2.54);
  const kgToLb = (kg: number) => kg / 0.45359237;

  // Compute goal percent when preset changes
  const effectiveGoalPercent = useMemo(() => {
    if (goalMode === "custom") return goalPercent;
    switch (goalPreset) {
      case "cut":
        return -15; // % deficit
      case "bulk":
        return 10; // % surplus
      default:
        return 0; // recomp: maintenance
    }
  }, [goalMode, goalPercent, goalPreset]);

  // Core calculations
  const calc = useMemo(() => {
    const kg = toKg(weight);
    const cm = toCm(height);
    const bf = bodyFat.trim() === "" ? null : Math.max(0, Math.min(70, parseFloat(bodyFat)));

    const lbmKg = bf != null ? kg * (1 - bf / 100) : kg; // if no BF, treat LBM≈BW for perkgLBM fallbacks

    // BMR: Katch-McArdle if BF provided, else Mifflin-St Jeor
    const bmr = bf != null
      ? 370 + 21.6 * lbmKg
      : (10 * kg) + (6.25 * cm) - (5 * age) + (sex === "male" ? 5 : sex === "female" ? -161 : -78);

    const tdee = bmr * activity;
    const targetCalories = Math.round(tdee * (1 + effectiveGoalPercent / 100));

    // Protein
    const proteinGrams = proteinMode === "perkgLBM"
      ? Math.round(Math.max(1.4, proteinPerKg) * lbmKg)
      : Math.round(Math.max(1.4, proteinPerKg) * kg);

    // Fat
    let fatGrams = 0;
    if (fatMode === "perkg") {
      fatGrams = Math.round(Math.max(0.6, fatPerKg) * kg);
    } else {
      const calsFromFat = Math.round(targetCalories * (fatPct / 100));
      fatGrams = Math.round(calsFromFat / 9);
    }

    // Carbs: remaining
    const calsAfterPF = targetCalories - (proteinGrams * 4 + fatGrams * 9);
    const carbGrams = Math.max(0, Math.round(calsAfterPF / 4));

    // Per-meal split
    const mealsClamped = Math.max(1, Math.min(8, Math.round(meals)));
    const perMeal = {
      calories: Math.round(targetCalories / mealsClamped),
      protein: +(proteinGrams / mealsClamped).toFixed(1),
      fat: +(fatGrams / mealsClamped).toFixed(1),
      carbs: +(carbGrams / mealsClamped).toFixed(1),
    };

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      proteinGrams,
      fatGrams,
      carbGrams,
      meals: mealsClamped,
      perMeal,
      details: { kg, cm, lbmKg, bf }
    };
  }, [units, sex, age, height, weight, bodyFat, activity, effectiveGoalPercent, proteinMode, proteinPerKg, fatMode, fatPerKg, fatPct, meals]);

  // Copy helpers
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copiado al portapapeles");
    } catch {
      // noop
    }
  };

  const exportJSON = () => {
    const payload = {
      inputs: {
        units,
        sex,
        age,
        height,
        weight,
        bodyFat,
        activity,
        goalPercent: effectiveGoalPercent,
        proteinMode,
        proteinPerKg,
        fatMode,
        fatPerKg,
        fatPct,
        meals,
      },
      outputs: calc,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "macros.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Calculadora de Macros</h1>
        <p className="text-sm text-muted-foreground">
          Usa {"Katch-McArdle"} si proporcionas % de grasa corporal; de lo contrario {"Mifflin‑St Jeor"}. Ajusta el objetivo para definir mantenimiento, déficit o superávit.
        </p>
      </header>

      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2">
        <section className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Datos corporales</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="col-span-2 flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium w-28">Unidades</span>
              <div className="inline-flex rounded-xl border overflow-hidden">
                <button onClick={() => setUnits("metric")} className={`px-3 py-1 text-sm ${units === "metric" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-transparent"}`}>Métrico</button>
                <button onClick={() => setUnits("imperial")} className={`px-3 py-1 text-sm ${units === "imperial" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-transparent"}`}>Imperial</button>
              </div>
            </label>

            <label className="col-span-2 flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium w-28">Sexo</span>
              <select className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
                <option value="unspecified">No especificado</option>
              </select>
            </label>
            <div className="flex flex-col gap-2 md:flex-row flex-wrap w-full">
            <NumField label="Edad" suffix="años" value={age} setValue={setAge} min={14} max={90} />
            <NumField label="Altura" suffix={units === "metric" ? "cm" : "in"} value={height} setValue={setHeight} min={120} max={units === "metric" ? 220 : 87} />
            <NumField label="Peso" suffix={units === "metric" ? "kg" : "lb"} value={weight} setValue={setWeight} min={35} max={units === "metric" ? 160 : 350} />
            </div>
            <label className="col-span-2 flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium w-28">Grasa %</span>
              <input className="input input--num no-spinner" type="number" inputMode="decimal" placeholder="Opcional" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} min={0} max={70} />
            </label>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Actividad y objetivo</h2>

          <label className="flex items-center gap-3 mb-3">
            <span className="shrink-0 text-sm font-medium w-28">Actividad</span>
            <select className="input input--num no-spinner" value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
              <option value={1.2}>Sedentaria (1.2)</option>
              <option value={1.375}>Ligera 1–3x (1.375)</option>
              <option value={1.55}>Moderada 3–5x (1.55)</option>
              <option value={1.725}>Intensa 6–7x (1.725)</option>
              <option value={1.9}>Muy intensa (1.9)</option>
            </select>
          </label>

          <div className="flex items-center gap-3 mb-3">
            <span className="shrink-0 text-sm font-medium w-28">Meta</span>
            <div className="inline-flex rounded-xl border overflow-hidden">
              <button onClick={() => setGoalMode("preset")} className={`px-3 py-1 text-sm ${goalMode === "preset" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-transparent"}`}>Preset</button>
              <button onClick={() => setGoalMode("custom")} className={`px-3 py-1 text-sm ${goalMode === "custom" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-transparent"}`}>Custom</button>
            </div>
          </div>

          {goalMode === "preset" ? (
            <div className="grid grid-cols-3 gap-2 mb-3">
              <GoalChip label="Corte −15%" active={goalPreset === "cut"} onClick={() => setGoalPreset("cut")} />
              <GoalChip label="Recomp ±0%" active={goalPreset === "recomp"} onClick={() => setGoalPreset("recomp")} />
              <GoalChip label="Bulk +10%" active={goalPreset === "bulk"} onClick={() => setGoalPreset("bulk")} />
            </div>
          ) : (
            <div className="mb-3">
              <RangeField label={`Ajuste (${effectiveGoalPercent}%)`} min={-25} max={20} step={1} value={goalPercent} onChange={setGoalPercent} />
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Un valor negativo aplica déficit, uno positivo aplica superávit sobre tu TDEE.
          </div>
        </section>
      </div>

      {/* Macro strategy */}
      <section className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Estrategia de macronutrientes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium w-28">Proteína</span>
              <select className="input input--num no-spinner" value={proteinMode} onChange={(e) => setProteinMode(e.target.value as any)}>
                <option value="perkgLBM">g/kg LBM</option>
                <option value="perkg">g/kg peso</option>
              </select>
            </label>
            <RangeField label={`g/kg (${proteinPerKg.toFixed(2)})`} min={1.2} max={2.4} step={0.1} value={proteinPerKg} onChange={setProteinPerKg} />
            <div className="text-xs text-gray-500 dark:text-gray-400">1.6–2.2 g/kg suele ser un buen rango para ganancia de masa y recomp.</div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <span className="shrink-0 text-sm font-medium w-28">Grasas</span>
              <select className="input input--num no-spinner" value={fatMode} onChange={(e) => setFatMode(e.target.value as any)}>
                <option value="perkg">g/kg peso</option>
                <option value="percentCalories">% calorías</option>
              </select>
            </label>
            {fatMode === "perkg" ? (
              <RangeField label={`g/kg (${fatPerKg.toFixed(2)})`} min={0.5} max={1.2} step={0.1} value={fatPerKg} onChange={setFatPerKg} />
            ) : (
              <RangeField label={`% calorías (${fatPct}%)`} min={15} max={40} step={1} value={fatPct} onChange={setFatPct} />
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400">Mínimo recomendado: ~0.6–0.8 g/kg para salud hormonal.</div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Resultados</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <MetricCard label="BMR" value={`${calc.bmr.toLocaleString()} kcal`} hint="Metabolismo basal" />
          <MetricCard label="TDEE" value={`${calc.tdee.toLocaleString()} kcal`} hint="Gasto diario estimado" />
          <MetricCard label="Objetivo" value={`${calc.targetCalories.toLocaleString()} kcal`} hint={`${effectiveGoalPercent}% vs TDEE`} />
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <MacroCard label="Proteína" grams={calc.proteinGrams} kcal={calc.proteinGrams * 4} />
          <MacroCard label="Grasas" grams={calc.fatGrams} kcal={calc.fatGrams * 9} />
          <MacroCard label="Carbohidratos" grams={calc.carbGrams} kcal={calc.carbGrams * 4} />
          <div className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700">
            <div className="text-sm font-medium mb-2">Dividir en comidas</div>
            <label className="flex items-center gap-3 mb-3">
              <span className="text-xs w-28"># comidas</span>
              <input className="input input--num no-spinner" type="number" min={1} max={8} value={meals} onChange={(e) => setMeals(parseInt(e.target.value || "1", 10))} />
            </label>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Aprox por comida:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Calorías</div><div className="text-right font-semibold">{calc.perMeal.calories}</div>
              <div>Proteína</div><div className="text-right font-semibold">{calc.perMeal.protein} g</div>
              <div>Grasas</div><div className="text-right font-semibold">{calc.perMeal.fat} g</div>
              <div>Carbos</div><div className="text-right font-semibold">{calc.perMeal.carbs} g</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button className="btn" onClick={() => copyText(`${calc.targetCalories} kcal | P ${calc.proteinGrams}g / F ${calc.fatGrams}g / C ${calc.carbGrams}g`)}>Copiar resumen</button>
          <button className="btn" onClick={exportJSON}>Descargar JSON</button>
        </div>
      </section>

      {/* Debug small print */}
      <details className="text-xs text-gray-500 dark:text-gray-400">
        <summary className="cursor-pointer">Detalles de cálculo</summary>
        <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(calc, null, 2)}</pre>
        <div className="mt-3">Unidades internas: kg/cm. Conversión automática cuando usas imperial.</div>
      </details>

    </div>
  );
}

// ——— UI Subcomponents ————————————————————————
function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

function MacroCard({ label, grams, kcal }: { label: string; grams: number; kcal: number }) {
  return (
    <div className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-xl font-semibold">{grams} g</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kcal} kcal</div>
    </div>
  );
}

function GoalChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`chip ${active ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-white dark:bg-gray-900"}`}>{label}</button>
  );
}

function RangeField({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{min}–{max}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full" />
    </label>
  );
}

function NumField({ label, suffix, value, setValue, min, max }: { label: string; suffix?: string; value: number; setValue: (v: number) => void; min?: number; max?: number }) {
  return (
    <label className="col-span-2 md:col-span-1 flex items-center gap-3">
      <span className="shrink-0 text-sm font-medium w-28">{label}</span>
      <div className="flex items-center gap-2 w-full">
        <input className="input input--num no-spinner" type="number" inputMode="decimal" value={value} min={min} max={max} onChange={(e) => setValue(parseFloat(e.target.value || "0"))} />
        {suffix && <span className="text-xs text-gray-500 dark:text-gray-400 w-10">{suffix}</span>}
      </div>
    </label>
  );
}
