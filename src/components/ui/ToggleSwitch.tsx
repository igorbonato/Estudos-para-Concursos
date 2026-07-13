import { useState } from 'react'

type Props = {
  defaultChecked?: boolean
  label?: string
  onChange?: (checked: boolean) => void
}

export default function ToggleSwitch({ defaultChecked = true, label, onChange }: Props) {
  const [checked, setChecked] = useState(defaultChecked)

  const toggle = () => {
    const next = !checked
    setChecked(next)
    onChange?.(next)
  }

  return (
    <button onClick={toggle} className="flex select-none items-center gap-2" role="switch" aria-checked={checked}>
      <div
        className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
          checked ? 'bg-primary' : 'bg-border'
        }`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full transition-all duration-300 ${
            checked ? 'left-[18px] bg-primary-foreground' : 'left-0.5 bg-muted-foreground'
          }`}
        />
      </div>
      {label && (
        <span className={`text-sm ${checked ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
      )}
    </button>
  )
}
