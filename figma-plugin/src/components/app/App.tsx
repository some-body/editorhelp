import React, { useCallback, useState } from 'react';
import { EditResult } from '../../entities/EditResult';
import { EditResultDto } from '../../entities/EditResultDto';
import { Backend } from '../../services/backend';
import { Editor } from '../../services/Editor';
import { EditResultPage } from '../edit-result-page/EditResultPage';
import './App.css';
import { AppProps } from './AppProps';

const backend = new Backend();
const editor = new Editor(backend);

export function App ({startPluginMessage}: AppProps): JSX.Element {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error>();
    const [editResult, setEditResult] = useState<EditResult>();

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
            <div>{error.stack}</div>
        </>);
    }

    if (isLoading) {
        return renderApp(<>Загрузка...</>);
    }

    if (editResult) {
        return renderApp(<EditResultPage editResult={editResult} />);
    }

    return renderApp(<>
        <div>Сейчас я вам тут все почистию</div>
        <button onClick={sendEditRequest}>Почистить</button>
    </>)
}

function renderApp(content: JSX.Element) {
    return <div className="app_root">{content}</div>
}