'use client'

type MenuItemProps = {
   onClick: () => void
   label: string
}

export const MenuItem = ({ onClick, label }: MenuItemProps) => {
   return (
      <div
         onClick={onClick}
         className="trnasition px-4 py-3 font-semibold hover:bg-neutral-100"
      >
         {label}
      </div>
   )
}
