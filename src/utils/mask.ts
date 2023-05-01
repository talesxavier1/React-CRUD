interface Imask {
    type: "number" | "string" | "date";
    value: any;
    mask: string;
}

export class mask {
    private type: "number" | "string" | "date";
    private value: any;
    private mask: string;

    public constructor(maskProps: Imask) {
        this.type = maskProps.type;
        this.value = maskProps.value;
        this.mask = maskProps.mask;
    }

    public applyMask(): string {
        if (!this.value) { return "" }
        if (this.type == "number") {
            let splitValue = this.value.toString().replace(/\D/g, '').split("");
            let mask = this.mask;

            splitValue.forEach((VALUE: string) => {
                mask = mask.replace("#", VALUE);
            });

            return mask.replace(/[#]+/g, "");
        }

        return "";
    }

}