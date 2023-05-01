import { TextField } from '@mui/material';
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
}

const TextFieldComponent = (props: props) => {
    const [textFieldValue, setTextFieldValue] = useState<string | number | null>(null);
    useEffect(() => {
        setTextFieldValue(props.value ?? "");
    }, [props.value]);

    if (props.mask && textFieldValue) {
        return (
            <div id={props.id} className='textFieldComponet-bdc8183e'>
                <TextField
                    inputRef={props.inputRef}
                    value={new mask({ mask: props.mask, type: 'number', value: textFieldValue }).applyMask()}
                    sx={props.sx}
                    label={props.label}
                    onChange={(e) => {
                        setTextFieldValue(e.currentTarget.value);
                    }}
                    disabled={props.readonly}
                />
            </div>
        );
    }

    return (
        <div id={props.id} className='textFieldComponet-bdc8183e'>
            <TextField
                inputRef={props.inputRef}
                sx={props.sx}
                label={props.label}
                value={textFieldValue ?? ""}
                onChange={(e) => {
                    setTextFieldValue(e.currentTarget.value);
                }}
                disabled={props.readonly}
            />
        </div>
    );
}

export default TextFieldComponent;