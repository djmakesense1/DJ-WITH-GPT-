import { useState } from "react"
...
export default function ShippingProfitCalculator() {
...
}
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ShippingProfitCalculator() {
  const [cargoQty, setCargoQty] = useState(32500)
  const [freightRate, setFreightRate] = useState(12)
  const [netpasDistance, setNetpasDistance] = useState(4800)
  const [speed, setSpeed] = useState(11)
  const [weatherLoss, setWeatherLoss] = useState(0.5) // knots lost due to weather
  const [portStay, setPortStay] = useState(4)
  const [bunkerPrice, setBunkerPrice] = useState(550)
  const [bunkerConsumption, setBunkerConsumption] = useState(25)
  const [holdCleaningCost, setHoldCleaningCost] = useState(5000)
  const [surveyCost, setSurveyCost] = useState(3000)
  const [commission, setCommission] = useState(7000)
  const [agencyFee, setAgencyFee] = useState(3000)
  const [demurrageBuffer, setDemurrageBuffer] = useState(5000)
  const [vesselPrice, setVesselPrice] = useState(24000000)
  const [targetTCE, setTargetTCE] = useState(8000)

  const effectiveSpeed = speed - weatherLoss
  const seaDays = netpasDistance / (effectiveSpeed * 24)
  const voyageDays = seaDays + portStay

  const bunkerCost = bunkerConsumption * seaDays * bunkerPrice
  const totalOtherCosts = bunkerCost + holdCleaningCost + surveyCost + commission + agencyFee + demurrageBuffer

  const grossRevenue = freightRate * cargoQty
  const netRevenue = grossRevenue - totalOtherCosts
  const tce = netRevenue / voyageDays
  const reverseFreight = ((targetTCE * voyageDays) + totalOtherCosts) / cargoQty
  const equivalentVesselPrice = (tce * 365) / 0.12 // assuming 12% ROI

  return (
    <div className="grid gap-4 p-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-bold">Shipping Profitability Calculator</h2>

          <div className="grid gap-2">
            <Label>Cargo Quantity (MT)</Label>
            <Input type="number" value={cargoQty} onChange={(e) => setCargoQty(Number(e.target.value))} />

            <Label>Freight Rate ($/MT)</Label>
            <Input type="number" value={freightRate} onChange={(e) => setFreightRate(Number(e.target.value))} />

            <Label>Netpas Distance (NM)</Label>
            <Input type="number" value={netpasDistance} onChange={(e) => setNetpasDistance(Number(e.target.value))} />

            <Label>Speed (knots)</Label>
            <Input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />

            <Label>Weather Factor (knots lost)</Label>
            <Input type="number" value={weatherLoss} onChange={(e) => setWeatherLoss(Number(e.target.value))} />

            <Label>Port Stay (Days)</Label>
            <Input type="number" value={portStay} onChange={(e) => setPortStay(Number(e.target.value))} />

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
          </div>

          <div className="grid gap-2 pt-4">
            <h3 className="text-lg font-semibold">📊 결과</h3>
            <p>Effective Speed: {effectiveSpeed.toFixed(2)} knots</p>
            <p>Sea Days: {seaDays.toFixed(2)} days</p>
            <p>Total Voyage Days: {voyageDays.toFixed(2)} days</p>
            <p>Total Costs: ${totalOtherCosts.toLocaleString()}</p>
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
