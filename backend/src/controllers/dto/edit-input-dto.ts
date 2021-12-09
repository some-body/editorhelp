export interface EditInputDto {
    texts: string[];
}

export function parseEditInputDto(json: any): EditInputDto | undefined {
    const texts = json['texts'];

    if (!Array.isArray(texts)) {
        return undefined;
    }

    return { texts };
}