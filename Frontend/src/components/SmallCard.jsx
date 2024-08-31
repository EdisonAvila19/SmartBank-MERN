/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function SmallCard({ children, label, url, active }) {

  let classList = 'flex flex-col items-center justify-center gap-3 text-white rounded-lg bg-root-bg-card2 hover:bg-root-bg-card2Hover min-h-36 min-w-44 xl:w-48 xl:h-36'
  if (!active) classList += ' inactive-card'

  return (
    <Link to={ url } className={ classList }>
      { children }
      <p className='text-xl'>{ label }</p>
    </Link>
  )
}