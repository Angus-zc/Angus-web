import { FC } from 'react'
import OInput from '../../option-widget/o-input/OInput'
import OInputFile from '../../option-widget/o-input-file/OInputFile'
import OColorSelector from '../../option-widget/o-color-selector/OColorSelector'
import OBorderRadio from '../../option-widget/o-border-radio/OBorderRadio'
import OTextAlighRadio from '../../option-widget/o-text-align-radio/OTextAlignRadio'
import { Options } from '../../../config/options'

interface IProps {
    type: Options
}

const OptionBaseComponent: FC<IProps> = (props) => {

    const { type } = props

    switch (type) {
        case Options.borderStyle:
            return <OBorderRadio type={Options.borderStyle} />

        case Options.textAlign:
            return <OTextAlighRadio type={Options.textAlign} />

        case Options.borderWidth:
            return <OInput type={Options.borderWidth} />

        case Options.width:
            return <OInput type={Options.width} />

        case Options.height:
            return <OInput type={Options.height} />

        case Options.left:
            return <OInput type={Options.left} />

        case Options.top:
            return <OInput type={Options.top} />

        case Options.propValue:
            return <OInput type={Options.propValue} />

        case Options.linkTo:
            return <OInput type={Options.linkTo} />

        case Options.fontWeight:
            return <OInput type={Options.fontWeight} />

        case Options.fontSize:
            return <OInput type={Options.fontSize} />

        case Options.lineHeight:
            return <OInput type={Options.lineHeight} />

        case Options.borderRadius:
            return <OInput type={Options.borderRadius} />

        case Options.url:
            return <OInputFile type={Options.url} />

        case Options.backgroundColor:
            return <OColorSelector type={Options.backgroundColor} />

        case Options.borderColor:
            return <OColorSelector type={Options.borderColor} />

        case Options.color:
            return <OColorSelector type={Options.color} />

        default:
            return null
    }


}

export default OptionBaseComponent