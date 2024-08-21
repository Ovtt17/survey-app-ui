import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import AccordionList from './AccordionList';
import { NewQuestion, Question } from '../../types/question';
import { QuestionType } from '../../types/questionType';
import { NewSurvey } from '../../types/survey';

interface AccordionState {
  id: number;
  expanded: boolean;
  question: NewQuestion;
}

const CreateSurveyForm: React.FC = () => {
  const [accordions, setAccordions] = useState<AccordionState[]>([
    { id: 1, expanded: false, question: { text: '', type: 'Texto' as QuestionType, options: [] } }
  ]);

  const [formData, setFormData] = useState<NewSurvey>(
    {
      title: '',
      description: '',
      creatorId: 1,
      questions: []
    }
  );

  const handleExpansion = (panelId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === panelId ? { ...accordion, expanded: isExpanded } : accordion
      )
    );
  };

  const handleInputChange = (id: number, value: string) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === id ? { ...accordion, question: { ...accordion.question, text: value } } : accordion
      )
    );
  };

  const handleTypeChange = (id: number, event: SelectChangeEvent<Question['type']>) => {
    const value = event.target.value as Question['type'];
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === id ? { ...accordion, question: { ...accordion.question, type: value } } : accordion
      )
    );
  };

  const addAccordion = () => {
    setAccordions((prevAccordions) => [
      ...prevAccordions,
      { id: prevAccordions.length + 1, expanded: false, question: { text: '', type: 'Texto' as QuestionType, options: [] } },
    ]);
  };

  const removeAccordion = (id: number) => {
    setAccordions((prevAccordions) => prevAccordions.filter((accordion) => accordion.id !== id));
  };

  const createSurvey = () => {
    const survey: NewSurvey = {
      ...formData,
      questions: accordions.map((accordion) => accordion.question)
    };
    
    // Lógica para crear la encuesta
    console.log('Encuesta creada:', accordions);
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-5'>Nueva Encuesta</h2>
      <div className='flex justify-center items-center'>
        <div className='w-11/12 bg-white p-8 rounded-lg shadow-xl'>
          <form onSubmit={createSurvey}>
            {/* Survey Title */}
            <div className='mb-6'>
              <label className="block text-gray-600 mb-2">Título</label>
              <input
                type="text"
                name="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Survey Description */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Descripción</label>
              <input
                type="text"
                name="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Questions Section */}
            <AccordionList
              accordions={accordions}
              handleExpansion={handleExpansion}
              handleInputChange={handleInputChange}
              handleTypeChange={handleTypeChange}
              addAccordion={addAccordion}
              removeAccordion={removeAccordion}
            />

            <div className='pt-10'>
              <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 }}>
                Crear Encuesta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyForm;