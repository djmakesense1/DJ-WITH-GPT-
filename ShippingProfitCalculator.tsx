import { useState } from "react";

export default function ShippingProfitCalculator() {
  const [cargoQty, setCargoQty] = useState(32500)
  const [freightRate, setFreightRate] = useState(12)
  const [netpasDistance, setNetpasDistance] = useState(4800)
  const [speed, setSpeed] = useState(11)
  const [weatherLoss, setWeatherLoss] = useState(0.5)
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
  const equivalentVesselPrice = (tce * 365) / 0.12

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2>Shipping Profitability Calculator</h2>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <label>Cargo Quantity (MT)</label>
        <input type="number" value={cargoQty} onChange={(e) => setCargoQty(Number(e.target.value))} />

        <label>Freight Rate ($/MT)</label>
        <input type="number" value={freightRate} onChange={(e) => setFreightRate(Number(e.target.value))} />

        <label>Netpas Distance (NM)</label>
        <input type="number" value={netpasDistance} onChange={(e) => setNetpasDistance(Number(e.target.value))} />

        <label>Speed (knots)</label>
        <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />

        <label>Weather Factor (knots lost)</label>
        <input type="number" value={weatherLoss} onChange={(e) => setWeatherLoss(Number(e.target.value))} />

        <label>Port Stay (Days)</label>
        <input type="number" value={portStay} onChange={(e) => setPortStay(Number(e.target.value))} />

        <label>Bunker Price ($/MT)</label>
        <input type="number" value={bunkerPrice} onChange={(e) => setBunkerPrice(Number(e.target.value))} />

        <label>Daily Bunker Consumption (MT/day)</label>
        <input type="number" value={bunkerConsumption} onChange={(e) => setBunkerConsumption(Number(e.target.value))} />

        <label>Hold Cleaning Cost (USD)</label>
        <input type="number" value={holdCleaningCost} onChange={(e) => setHoldCleaningCost(Number(e.target.value))} />

        <label>Survey Cost (USD)</label>
        <input type="number" value={surveyCost} onChange={(e) => setSurveyCost(Number(e.target.value))} />

        <label>Commission (USD)</label>
        <input type="number" value={commission} onChange={(e) => setCommission(Number(e.target.value))} />

        <label>Agency Fee (USD)</label>
        <input type="number" value={agencyFee} onChange={(e) => setAgencyFee(Number(e.target.value))} />

        <label>Demurrage Buffer (USD)</label>
        <input type="number" value={demurrageBuffer} onChange={(e) => setDemurrageBuffer(Number(e.target.value))} />

        <label>Vessel Price (USD)</label>
        <input type="number" value={vesselPrice} onChange={(e) => setVesselPrice(Number(e.target.value))} />

        <label>Target TCE ($/Day)</label>
        <input type="number" value={targetTCE} onChange={(e) => setTargetTCE(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>📊 결과</h3>
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
    </div>
  )
}
