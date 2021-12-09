import { EditResultDto, getEditResultFromJson } from "../entities/EditResultDto";

const EDIT_URL = 'https://d5drn1mhron55pan9vk3.apigw.yandexcloud.net/api/edit'

export class Backend {

    async edit(texts: string[]): Promise<EditResultDto> {
        const result = await fetch(EDIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ texts }),
        });

        if (!result.ok) {
            throw Error(`Server http error: ${result.status}`);
        }

        const json = await result.json();
        return getEditResultFromJson(json);
    }
}
