export function deserializeTanStack(node: any): any {
    if (node === null || node === undefined) {
        return node;
    }

    // Primitive values
    if ('s' in node && node.t !== 10 && node.t !== 9) {
        return node.s;
    }

    // Array
    if (node.t === 9 && Array.isArray(node.a)) {
        return node.a.map((item: any) => deserializeTanStack(item));
    }

    // Object
    if (node.t === 10 && node.p) {
        const result: Record<string, any> = {};

        const keys = node.p.k;
        const values = node.p.v;

        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = deserializeTanStack(values[i]);
        }

        return result;
    }

    return node;
}

export function changeSerializedField(node: any, field: string, value: string) {
    if (!node || typeof node !== 'object') return;

    if (node.t === 10 && node.p?.k && node.p?.v) {
        const index = node.p.k.indexOf(field);

        if (index !== -1) {
            node.p.v[index].s = value;
        }
    }

    for (const child of Object.values(node)) {
        changeSerializedField(child, field, value);
    }
}
