/* eslint-disable @typescript-eslint/no-explicit-any */
declare class Stringified<T> extends String {
	private ___stringified: T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JSON {
	stringify<T>(
			value: T,
			replacer?: (key: string, value: any) => any,
			space?: string | number
	): string & Stringified<T>
	parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T
	parse(text: string, reviver?: (key: any, value: any) => any): any
}