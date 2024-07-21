import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import { Button } from '@mui/material';

const Quiz = ({setQuizPage}) => {
    const navigate = useNavigate();

    const quizData = [
        {
            title: 'Quiz 1',
            description: 'Planet Tours',
            link: '/MCQ/MCQPage', // Updated link
            quizType: 'mcq',
            quizPage: 0
        },
        {
            title: 'Quiz 2',
            description: 'Solar Cosmics',
            link: 'https://www.carwow.co.uk/mercedes/amg-gt-coupe',
            quizType: 'fill',
            quizPage: 1
        },
        {
            title: 'Quiz 3',
            description: 'Lunar Lessons',
            link: 'https://www.carwow.co.uk/audi/rs5',
            quizType: 'match',
            quizPage: 2
        },
    ];

    return (
        <section className="px-full py-16">
            <h2 className="text-3xl text-white font-bold text-center mb-8">My Quiz</h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {quizData.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.description}
                        quizType={item.quizType}
                        link={item.link}
                        quizPage={item.quizPage} // Added quizPage prop to Card component to pass quiz page number
                        navigate={navigate}
                        setQuizPage={setQuizPage} // Pass navigate function
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(item.link)}
                        >
                            Start Quiz
                        </Button>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Quiz;



