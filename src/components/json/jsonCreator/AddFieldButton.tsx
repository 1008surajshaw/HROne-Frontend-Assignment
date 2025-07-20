import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddFieldButtonProps {
  onClick: () => void
  label?: string
  size?: "sm" | "default"
  variant?: "default" | "outline"
}

export default function AddFieldButton({
  onClick,
  label = "Add Field",
  size = "default",
  variant = "default",
}: AddFieldButtonProps) {
  return (
    <Button onClick={onClick} size={size} variant={variant}>
      <Plus className="w-4 h-4 mr-1" />
      {label}
    </Button>
  )
}