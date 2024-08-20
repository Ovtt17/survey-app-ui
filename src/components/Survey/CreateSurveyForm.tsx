import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import AccordionList from './AccordionList';
import { Question } from '../../types/question';

interface AccordionState {
  id: number;
  expanded: boolean;
  question: Question;
}

const CreateSurveyForm: React.FC = () => {
  const [accordions, setAccordions] = useState<AccordionState[]>([
    { id: 1, expanded: false, question: { id: 1, surveyId: 1, text: '', type: 'Texto' as Question['type'] } }
  ]);

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
      { id: prevAccordions.length + 1, expanded: false, question: { id: prevAccordions.length + 1, surveyId: 1, text: '', type: 'Texto' as Question['type'] } },
    ]);
  };

  const removeAccordion = (id: number) => {
    setAccordions((prevAccordions) => prevAccordions.filter((accordion) => accordion.id !== id));
  };

  const createSurvey = () => {
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