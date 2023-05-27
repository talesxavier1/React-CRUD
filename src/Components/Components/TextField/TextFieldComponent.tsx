import { InputAdornment, TextField } from '@mui/material';
import { Theme } from '@mui/material/styles/';
import { SxProps } from '@mui/system/styleFunctionSx';
import { mask } from "../../../utils/mask";
import 'jquery-mask-plugin';
import { MutableRefObject, useEffect, useState } from 'react';
import './TextFieldComponent.css'

interface props {
    label: string
    sx?: SxProps<Theme>
    id?: string
    mask?: string
    value?: any
    inputRef?: MutableRefObject<any>
    readonly?: boolean
    multiline?: {
        rows: number
    }
    type?: "number" | "text" | "monetary"
    monetaryType?: string
}

const TextFieldComponent = (props: props) => {
    const [textFieldValue, setTextFieldValue] = useState<string | number | null>(null);
    useEffect(() => {
        setTextFieldValue(props.value ?? "");
    }, [props.value]);

    return (
        <div id={props.id} className='textFieldComponet-bdc8183e'>
            <TextField

                inputRef={props.inputRef}
                sx={props.sx}
                type={(() => {
                    if (['number', "monetary"].includes(props.type ?? "")) {
                        return "number";
                    }
                    return "text";
                })()}
                label={props.label}
                value={(() => {
                    if (!textFieldValue) { return ['number', "monetary"].includes(props.type ?? "") ? 0 : "" }
                    if (props.mask) {
                        return new mask({ mask: props.mask, type: 'number', value: textFieldValue }).applyMask();
                    }
                    return textFieldValue
                })()}
                onChange={(e) => {
                    if (['number', "monetary"].includes(props.type ?? "")) {
                        setTextFieldValue(Number(e.currentTarget.value));
                    }
                    setTextFieldValue(e.currentTarget.value);
                }}
                InputProps={(() => {
                    if (props.type == "monetary") {
                        return {
                            startAdornment: <InputAdornment position="start">{props.monetaryType ? props.monetaryType : "$"}</InputAdornment>
                        }
                    }
                })()}
                disabled={props.readonly}
                size='small'
                multiline={props.multiline ? true : false}
                rows={props.multiline ? props.multiline.rows : undefined}
            />
        </div>
    )

}

export default TextFieldComponent;