import RowSelectItem from "./RowSelectItem"

function RowSelect(props : {options: string[], selected: number, onSelectedChange: (index: number) => void}) {
  return (
    <div className="row-select">

      {props.options.map((option, index) => (
        <RowSelectItem
          key={index}
          selectName="format"
          option={option}
          selected={index === props.selected}
          onClick={() => props.onSelectedChange(index)}
        />
      ))}
            
    </div>
  )
}

export default RowSelect
