import React, { useCallback, useState } from 'react';
import { EditResultDto } from '../../entities/EditResultDto';
import { Backend } from '../../services/backend';
import { Editor } from '../../services/Editor';
import { EditResult } from '../edit-result/EditResult';
import './App.css';
import { AppProps } from './AppProps';

const backend = new Backend();
const editor = new Editor(backend);

export function App ({startPluginMessage}: AppProps): JSX.Element {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error>();
    const [editResult, setEditResult] = useState<EditResultDto>();

    const sendEditRequest = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await editor.getEditResult(startPluginMessage); 
            setEditResult(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (error) {
        return (<>
            <div>Ошибка</div>
            <div>{error.message}</div>
        </>);
    }

    if (isLoading) {
        return renderApp(<>Загрузка...</>);
    }

    if (editResult) {
        return renderApp(<EditResult editResult={editResult} />);
    }

    return renderApp(<>
        <div>Сейчас я вам тут все почистию</div>
        <button onClick={sendEditRequest}>Почистить</button>
    </>)
}

function renderApp(content: JSX.Element) {
    return <div className="app_root">{content}</div>
}