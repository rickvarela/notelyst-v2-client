import styled from 'styled-components'
import { convertToRaw } from 'draft-js'

const StyledNotesMenu = styled.div`
    background-color: #E7EBEE;
    width: ${({screenState}) => (screenState.expandMenu ? 0 : screenState.isMobile ? '100%' : '400px')};
    overflow-x: hidden;
    opacity: ${({screenState}) => (screenState.expandMenu ? 0 : '100%')};
    transition: opacity 700ms;
`

export const NotesMenu = ({ noteState, noteActions, handelExpand, screenState }) => {

    return (
        <StyledNotesMenu screenState={screenState}>
            <NotesMenuHeader noteActions={noteActions} handelExpand={handelExpand} screenState={screenState}/>
            <NotesList noteState={noteState} handelExpand={handelExpand} screenState={screenState} noteActions={noteActions}/>
        </StyledNotesMenu>
    )
}

const StyledNotesHeader = styled.div`
    background-color: #324A5F;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 5px;
`

const NotesMenuHeader = ({ noteActions, handelExpand, screenState }) => {
    return (
        <StyledNotesHeader>
            <span>Notes List</span>
            <div>
                {screenState.isMobile && <button onClick={handelExpand}>CLOSE MENU</button>}
                <button onClick={noteActions.createNote}>NEW NOTE</button>
            </div>
        </StyledNotesHeader>
    )
}

const NotesList = ({ noteState, noteActions, handelExpand, screenState }) => {
    return (
        <div>
            {noteState.map((note, index) =>
                <NoteItem key={note._id} note={note} noteActions={noteActions} handelExpand={handelExpand} screenState={screenState} index={index} />
            )}
        </div>
    )
}

const StyledNoteItem = styled.div`
    background-color: ${props => props.isCurrent ? '#A1B9CE' : 'none'};
    padding: 5px;
    height: 60px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #BBC6D3;

    &:hover {
        background-color: ${props => props.isCurrent ? 'none' : '#CED6DF'};
        ;
    }
`

const StyledNoteTitle = styled.div`
    font-weight: bold;
    margin: auto 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const NoteItem = ({ note, noteActions, index, handelExpand, screenState }) => {

    const insertContent = () => {
        let noteContent = convertToRaw(note.editorState.getCurrentContent()).blocks
        let noteText = ''

        if (noteContent.length <= 1 && noteContent[0].text === '') {
            return <StyledNoteTitle>New Note...</StyledNoteTitle>
        }
        for (let line of noteContent.slice(1)) {
            noteText += ` ${line.text}`
            if (noteText.length > 50) break
        }

        return (
            <>
            <StyledNoteTitle>{noteContent[0].text}</StyledNoteTitle>
            {noteContent[1] && <div>{noteText}</div>}
            </>
        )
    }


    const handelClick = () => {
        noteActions.changeCurrentNote(note._id)
        if (screenState.isMobile) {
            handelExpand()
        }
    }

    return (
        <StyledNoteItem onClick={handelClick} isCurrent={noteActions.isCurrentNote(note._id)}>
            {insertContent()}
        </StyledNoteItem>
    )
}