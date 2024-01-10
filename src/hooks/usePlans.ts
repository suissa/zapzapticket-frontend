import { useState, MutableRefObject, useRef, useEffect } from "react"
import Plan from "../core/Plan"
import PlanRepository from "../core/PlanRepository"
import useLayout from "./useLayout"
import { API_URL } from "../config"

export default function usePlans() {
  const [plan, setPlan] = useState<Plan>(Plan.empty())
  const [plans, setPlans] = useState<Plan[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listPlans, [])

  function createPlan() {
    setPlan(Plan.empty())
    showForm()
  }

  function listPlans() {
    fetch(`${API_URL}/plans/actives`)
      .then(response => response.json())
      .then(data => {
        console.log("listPlans then", data)
        return setPlans(data)
      })
  }

  function getPlan(plan: Plan) {
    setPlan(plan)
    showForm()
  }

  async function deletePlan(plan: Plan) {
    listPlans()
  }

  async function savePlan(plan: Plan) {
    console.log("savePlan plan", plan)
    const planStr = plan?._id
      ? JSON.stringify({
          _id: plan._id,
          name: plan.name,
          users: Number(plan.users),
          connections: Number(plan.connections),
          queues: Number(plan.queues),
          value: Number(plan.value),
          isActive: plan.isActive,
        })
      : JSON.stringify({
        name: plan.name,
        users: Number(plan.users),
        connections: Number(plan.connections),
        queues: Number(plan.queues),
        value: Number(plan.value),
        isActive: plan.isActive,
      })
    console.log("savePlan planStr", planStr)
    const response = plan?._id
      ? await fetch(`${API_URL}/plans/${plan._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: planStr
      })
      : await fetch(`${API_URL}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: planStr
      });
      listPlans()
      showTable()
    ;
  }

  return {
    plan,
    plans,
    setPlans,
    createPlan,
    savePlan,
    deletePlan,
    getPlan,
    listPlans,
    showTable,
    tableVisible
  }
}