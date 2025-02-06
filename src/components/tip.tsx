import classNames from 'classnames'
import { InformationIcon } from '@remixicons/react/line'
import React, { type ReactNode } from 'react'

type TipType = {
  type: 'info' | 'warning' | 'success' | 'error'
  children: ReactNode
}
const Tip = ({ type, children }: TipType) => {
  return (
    <div
      className={classNames('tip-block', {
        info: type === 'info',
        warning: type === 'warning',
        success: type === 'success',
        error: type === 'error'
      })}
    >
      <InformationIcon className="icon" />
      <div>{children}</div>
    </div>
  )
}

export default Tip
