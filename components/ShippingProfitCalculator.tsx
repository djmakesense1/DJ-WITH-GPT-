import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface PortEntry {
name: string
role: "Load" | "Discharge" | "Canal" | "Bunker"
distance: number
stay: number
cost: number
}

export default function ShippingProfitCalculator() {
const [cargoQty, setCargoQty] = useState(32500)
const [freightRate, setFreightRate] = useState(12)
const [speed, setSpeed] = useState(11)
const [weatherLoss, setWeatherLoss] = useState(0.5)
const [bunkerPrice, setBunkerPrice] = useState(550)
const [bunkerConsumption, setBunkerConsumption] = useState(25)
const [holdCleaningCost, setHoldCleaningCost] = useState(5000)
const [surveyCost, setSurveyCost] = useState(3000)
const [commission, setCommission] = useState(7000)
const [agencyFee, setAgencyFee] = useState(3000)
const [demurrageBuffer, setDemurrageBuffer] = useState(5000)
const [vesselPrice, setVesselPrice] = useState(24000000)
const [targetTCE, setTargetTCE] = useState(8000)
const [ports, setPorts] = useState<PortEntry[]>([])

const addPort = () => {
setPorts([...ports, { name: "", role: "Load", distance: 0, stay: 0, cost: 0 }])
}

const updatePort = (index: number, key: keyof PortEntry, value: string | number) => {
const updatedPorts = [...ports]
updatedPorts[index][key] = key === "name" || key === "role" ? String(value) : Number(value)
setPorts(updatedPorts)
}

const totalDistance = ports.reduce((sum, port) => sum + port.distance, 0)
const totalPortTime = ports.reduce((sum, port) => sum + port.stay, 0)
const totalPortCharges = ports.reduce((sum, port) => sum + port.cost, 0)

const effectiveSpeed = speed - weatherLoss
const seaDays = totalDistance / (effectiveSpeed * 24)
const voyageDays = seaDays + totalPortTime

const bunkerCost = bunkerConsumption * seaDays * bunkerPrice
const totalOtherCosts = bunkerCost + totalPortCharges + holdCleaningCost + surveyCost + commission + agencyFee + demurrageBuffer

const grossRevenue = freightRate * cargoQty
const netRevenue = grossRevenue - totalOtherCosts
const tce = netRevenue / voyageDays
const reverseFreight = ((targetTCE * voyageDays) + totalOtherCosts) / cargoQty
const equivalentVesselPrice = (tce * 365) / 0.12

return (Shipping Profitability Calculator
        <div className="grid gap-2">
        <Label>Cargo Quantity (MT)</Label>
        <Input type="number" value={cargoQty} onChange={(e) => setCargoQty(Number(e.target.value))} />

        <Label>Freight Rate ($/MT)</Label>
        <Input type="number" value={freightRate} onChange={(e) => setFreightRate(Number(e.target.value))} />

        <Label>Speed (knots)</Label>
        <Input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />

        <Label>Weather Factor (knots lost)</Label>
        <Input type="number" value={weatherLoss} onChange={(e) => setWeatherLoss(Number(e.target.value))} />

        <Label>Bunker Price ($/MT)</Label>
        <Input type="number" value={bunkerPrice} onChange={(e) => setBunkerPrice(Number(e.target.value))} />

        <Label>Daily Bunker Consumption (MT/day)</Label>
        <Input type="number" value={bunkerConsumption} onChange={(e) => setBunkerConsumption(Number(e.target.value))} />

        <Label>Hold Cleaning Cost (USD)</Label>
        <Input type="number" value={holdCleaningCost} onChange={(e) => setHoldCleaningCost(Number(e.target.value))} />

        <Label>Survey Cost (USD)</Label>
        <Input type="number" value={surveyCost} onChange={(e) => setSurveyCost(Number(e.target.value))} />

        <Label>Commission (USD)</Label>
        <Input type="number" value={commission} onChange={(e) => setCommission(Number(e.target.value))} />

        <Label>Agency Fee (USD)</Label>
        <Input type="number" value={agencyFee} onChange={(e) => setAgencyFee(Number(e.target.value))} />

        <Label>Demurrage Buffer (USD)</Label>
        <Input type="number" value={demurrageBuffer} onChange={(e) => setDemurrageBuffer(Number(e.target.value))} />

        <Label>Vessel Price (USD)</Label>
        <Input type="number" value={vesselPrice} onChange={(e) => setVesselPrice(Number(e.target.value))} />

        <Label>Target TCE ($/Day)</Label>
        <Input type="number" value={targetTCE} onChange={(e) => setTargetTCE(Number(e.target.value))} />

        <div className="grid gap-2 pt-4">
          <h3 className="font-semibold">🛳 Port Rotation</h3>
          {ports.map((port, index) => (
            <div key={index} className="grid grid-cols-6 gap-2">
              <Input placeholder="Port Name" value={port.name} onChange={(e) => updatePort(index, "name", e.target.value)} />
              <select value={port.role} onChange={(e) => updatePort(index, "role", e.target.value)} className="border rounded p-2">
                <option value="Load">Load</option>
                <option value="Discharge">Discharge</option>
                <option value="Canal">Canal</option>
                <option value="Bunker">Bunker</option>
              </select>
              <Input placeholder="Distance" type="number" value={port.distance} onChange={(e) => updatePort(index, "distance", e.target.value)} />
              <Input placeholder="Stay (days)" type="number" value={port.stay} onChange={(e) => updatePort(index, "stay", e.target.value)} />
              <Input placeholder="Port Cost" type="number" value={port.cost} onChange={(e) => updatePort(index, "cost", e.target.value)} />
            </div>
          ))}
          <Button onClick={addPort}>+ Add Port</Button>
        </div>
      </div>

      <div className="grid gap-2 pt-4">
        <h3 className="text-lg font-semibold">📊 결과</h3>
        <p>Total Distance: {totalDistance.toFixed(0)} NM</p>
        <p>Total Port Time: {totalPortTime.toFixed(2)} days</p>
        <p>Effective Speed: {effectiveSpeed.toFixed(2)} knots</p>
        <p>Sea Days: {seaDays.toFixed(2)} days</p>
        <p>Total Voyage Days: {voyageDays.toFixed(2)} days</p>
        <p>Total Port Charges: ${totalPortCharges.toLocaleString()}</p>
        <p>Total Other Costs: ${totalOtherCosts.toLocaleString()}</p>
        <p>Gross Revenue: ${grossRevenue.toLocaleString()}</p>
        <p>Net Revenue: ${netRevenue.toLocaleString()}</p>
        <p>Actual TCE: ${tce.toFixed(2)}/day</p>
        <p>Required Freight for Target TCE: ${reverseFreight.toFixed(2)}/MT</p>
        <p>Equivalent Vessel Price (12% ROI): ${equivalentVesselPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
      </div>
    </CardContent>
  </Card>
</div>
)
}
