type Skill = {
  label: string
  level: number
}

type Props = {
  value: Skill[]
  onChange(v: Skill[]): void
}

export default function Post_form_fields_skills({}: Props) {}
