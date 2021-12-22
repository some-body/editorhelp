import React, { useCallback, useState } from 'react';
import { EditResult } from '../../entities/EditResult';
import { Backend } from '../../services/backend';
import { Editor } from '../../services/Editor';
import { EditResultPage } from '../edit-result-page/EditResultPage';
import { AppProps } from './AppProps';
import './App.css';

const backend = new Backend();
const editor = new Editor(backend);

export function App (
    { onNodeEditResult, navigateToNode, getSelectedNodes }: AppProps,
): JSX.Element {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error>();
    const [editResult, setEditResult] = useState<EditResult>();

    const sendEditRequest = useCallback(async () => {
        setIsLoading(true);
        try {
            const selectedNodes = await getSelectedNodes();
            const result = await editor.getEditResult(selectedNodes); 
            setEditResult(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [getSelectedNodes, editor]);

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
        if (editResult.textEditResults.length > 0) {
            return renderApp(
                <EditResultPage 
                    editResult={editResult} 
                    onApplyTextChanges={onNodeEditResult} 
                    navigateToNode={navigateToNode}
                />
            );
        } else {
            return renderApp(<>Не нашли ошибок</>);
        }
    }

    return renderApp(<>
        <div className="app__startup">
            <div>Сейчас я вам тут все почистию</div>
            <button className="app__start-btn" onClick={sendEditRequest}>Почистить</button>
        </div>
    </>)
}

function renderApp(content: JSX.Element) {
    return <div className="app__root">{content}</div>
}