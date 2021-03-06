import styled from "styled-components";

import { InputAreaEditor } from '../components/InputAreaEditor'

const StyledInputArea = styled.div`
    background-color: none;
    flex: 1;
    display: flex;
    width: ${({screenState}) => (screenState.isMobile && screenState.expandMenu ? '100%' : 0 )};
    overflow: hidden;
    flex-direction: column;
`

export const InputArea = ({ editorState, setEditorState, handelExpand, screenState }) => {
    return (
        <StyledInputArea screenState={screenState}>
            <InputAreaHeader handelExpand={handelExpand} />
            <InputAreaEditor editorState={editorState} setEditorState={setEditorState} />
        </StyledInputArea>
    )
}

const StyledInputAreaHeader = styled.div`
    background-color: #324A5F;
    color: white;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const InputAreaHeader = ({ handelExpand }) => {
    return (
        <StyledInputAreaHeader>
            Editor Area
            <button onClick={handelExpand} >EXPAND MENU</button>
        </StyledInputAreaHeader>
    )
}