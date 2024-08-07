import React, {useState} from 'react';
import MCQPage from './Components/MCQ/A_MCQPage';

export default function Quizzes() {
    const [quizPage, setQuizPage]=useState(null);

    if (quizPage===1){
    return (
        <div>
            <MCQPage/>
        </div>
        );
    }

    if (quizPage===2){
        return (
            <div>
                <h1>Quiz 2</h1>
            </div>
        );
    }

    if (quizPage===3){
        return (
            <div>
                <h1>Quiz 3</h1>
            </div>
        );
    }
    
}