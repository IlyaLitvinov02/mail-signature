import { ReactNode, ReactElement } from "react"
import "./InfoCard.scss"

type ListItem = {
  name: string;
  value: ReactNode
}

type InfoCardProps<T extends ListItem> = {
  data: Array<T>
}

const InfoCard = <T extends ListItem>({ data }: InfoCardProps<T>): ReactElement => {
  const copyInfoToClipboard = async () => {
    await navigator.clipboard.writeText(
      data.map(({name, value}) => `${name}: ${value || '---'}`).join(', ')
    )
  }

  return (
    <div className="info-card">
      <ul className="info-card-list">
        {data.map(({ name, value }) =>
          <li key={name} className="list-item">
            <span className="list-item-label">{`${name}: `}</span> {value}
          </li>
        )}
      </ul>
      <button className="copy-button" onPointerUp={copyInfoToClipboard}>
        Copy to clipboard
      </button>
    </div>
  )
}

export default InfoCard