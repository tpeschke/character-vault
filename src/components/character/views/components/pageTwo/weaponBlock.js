import React from 'react'

export default function WeaponBlock({ weapon }) {
    let { position } = weapon
    return (
        <div className={`weaponProfile${position}`}>
            <p className="weaponnameLocation">{onename}</p>
            <p className="basedamageLocation">{onebasedamage}</p>
            <p className="baserecoveryLocation">{onebaserecovery}</p>
            <p className="baseparryLocation">{onebaseparry}</p>
            <p className="basemeasureLocation">{onebasemeasure}</p>
            <p className="basesizeLocation">{onesize}</p>
            <p className="typeLocation">{onetype}</p>
            <p className="bonusLocation">{onebonus}</p>
            <p className="traitsLocation">{onetraits}</p>

            <p className="trainattackLocation">{onetrainattack}</p>
            <p className="trainrecoveryLocation">{onetrainrecovery}</p>
            <p className="trainparryLocation">{onetrainparry}</p>
            <p className="traindamageLocation">{onetraindamage}</p>

            <input className="miscattackLocation" type="number" defaultValue={onemiscattack} onBlur={event => this.updateAttribute(event.target.value, "onemiscattack")} />
            <input className="miscrecoveryLocation" type="number" defaultValue={onemiscrecovery} onBlur={event => this.updateAttribute(event.target.value, "onemiscrecovery")} />
            <input className="miscparryLocation" type="number" defaultValue={onemiscparry} onBlur={event => this.updateAttribute(event.target.value, "onemiscparry")} />
            <input className="miscdamageLocation" type="number" defaultValue={onemiscdamage} onBlur={event => this.updateAttribute(event.target.value, "onemiscdamage")} />
            <input className="miscinitLocation" type="number" defaultValue={onemiscinit} onBlur={event => this.updateAttribute(event.target.value, "onemiscinit")} />

            <p className="totalattackLocation">{this.returnZeroIfNaN(onetrainattack + +onemiscattack)}</p>
            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponOneRecovery)}</p>
            <p className="totalparryLocation">{this.returnZeroIfNaN(onetrainparry + +onemiscparry)}</p>
            <p className="totaldamageLocation">{this.returnZeroIfNaN(onetraindamage + +onemiscdamage)}</p>
            <p className="totalinitLocation">{onemiscinit}</p>
        </div>
    )
}