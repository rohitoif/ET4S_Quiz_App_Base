import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import { Button } from '@mui/material'; // Import Button from MUI

const Quiz = () => {

    const quizData = [
        {
            title: 'Quiz 1',
            description: 'Planet Tours',
            link: 'https://www.carwow.co.uk/car-reviews#make-model-menu',
            quizType: 'mcq'
        },
        {
            title: 'Quiz 2',
            description: 'Solar Cosmics',
            link: 'https://www.carwow.co.uk/mercedes/amg-gt-coupe',
            quizType: 'fill'
        },
        {
            title: 'Quiz 3',
            description: 'Lunar Lessons',
            link: 'https://www.carwow.co.uk/audi/rs5',
            quizType: 'match'
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
                                >
                                    {
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                    >
                                        Start Quiz
                                    </Button> }
                                </Card>
                            ))}
                        </div>
        </section>
    );
}

export default Quiz;


