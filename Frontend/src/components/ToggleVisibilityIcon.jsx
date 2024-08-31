/* eslint-disable react/prop-types */
import { HideSVG, ShowSVG } from '../components/Icons'

export function ToggleVisibilityIcon({ handleClick, condition}) {
  return (
    condition 
      ? (
        <button id='saldo-activo' onClick={ handleClick }>
          <HideSVG />
        </button>
      )
      : (
        <button id='saldo-oculto' className='w-9 sm:w-auto' onClick={ handleClick }>
          <ShowSVG />
        </button>
      )
  )
}