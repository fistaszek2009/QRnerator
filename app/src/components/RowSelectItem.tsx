
 function RowSelectItem(props : {selectName: string, option: string, selected: boolean, onClick: () => void}) {
  return (
    <label className={'row-select-item ' + (props.selected ? 'is-selected' : '')} htmlFor={`rowSelectItem-${props.selectName}-${props.option}`}>
                {props.option} 
                {/* <input type='radio' name={props.selectName} id={`rowSelectItem-${props.selectName}-${props.option}`} value={props.option} checked={props.selected} onClick={props.onClick}/> */}
    </label>
  )
}

export default RowSelectItem