import md5 from "md5";
export class hashMd5 {
    public static getHash(value: string): string {
        return md5(value);
    }
}