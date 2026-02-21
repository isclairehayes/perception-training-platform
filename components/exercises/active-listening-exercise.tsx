'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  getConversationById,
} from '@/lib/exercises/active-listening-dataset';
import { 
  getQuestionsByLevel,
} from '@/lib/exercises/active-listening-exercises';
import { getTheoryByLevel } from '@/lib/exercises/active-listening-theory';
import type {
  ActiveListeningExerciseResult,
  DifficultyLevel,
  ExerciseQuestion,
} from '@/lib/exercises/active-listening-types';

interface ActiveListeningExerciseProps {
  level: DifficultyLevel;
  onComplete: (results: ActiveListeningExerciseResult) => void;
}

type ExerciseMode = 'theory' | 'conversation' | 'question' | 'feedback' | 'levelComplete';

export function ActiveListeningExercise({ level, onComplete }: ActiveListeningExerciseProps) {
  const [mode, setMode] = useState<ExerciseMode>('theory');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [results, setResults] = useState<ActiveListeningExerciseResult[]>([]);

  // Obtener contenido del nivel
  const questions = getQuestionsByLevel(level);
  const currentQuestion = questions[currentQuestionIndex];
  const conversation = currentQuestion ? getConversationById(currentQuestion.conversationId) : null;
  const theory = getTheoryByLevel(level);

  // Reset cuando cambia el nivel
  useEffect(() => {
    setMode('theory');
    setCurrentQuestionIndex(0);
    setResults([]);
    setSelectedAnswer(null);
  }, [level]);

  // ========== THEORY MODE ==========
  if (mode === 'theory') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">🎯</div>
            <div>
              <h2 className="text-2xl font-bold">Nivel {level}: Escucha Activa</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aprende a detectar información implícita en conversaciones
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {theory.map((section, index) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">
                    {index === 0 ? '📖' : index === 1 ? '🔍' : index === 2 ? '⭐' : '🧠'}
                  </span>
                  {section.title}
                </CardTitle>
                {section.difficulty === level && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full w-fit">
                    Nuevo en este nivel
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {section.content}
                  </div>
                  {section.examples.length > 0 && (
                    <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-sm">📝 Ejemplos:</h4>
                      <ul className="space-y-1 text-sm">
                        {section.examples.map((example, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={() => setMode('conversation')} size="lg" className="w-full">
          Comenzar Ejercicios →
        </Button>
      </div>
    );
  }

  // ========== CONVERSATION MODE ==========
  if (mode === 'conversation' && conversation) {
    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
          </div>
          <Progress value={currentQuestionIndex} max={questions.length} />
        </div>

        {/* Conversation Context */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              {conversation.title}
            </CardTitle>
            <CardDescription>{conversation.context}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversation.transcripts.map((transcript) => (
                <div
                  key={transcript.id}
                  className={`p-3 rounded-lg ${
                    transcript.speaker === conversation.transcripts[0].speaker
                      ? 'bg-blue-100 dark:bg-blue-900/30 ml-0 mr-12'
                      : 'bg-purple-100 dark:bg-purple-900/30 ml-12 mr-0'
                  }`}
                >
                  <div className="font-semibold text-xs mb-1 text-gray-700 dark:text-gray-300">
                    {transcript.speaker}
                  </div>
                  <div className="text-sm">{transcript.text}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {conversation.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={() => setMode('question')} size="lg" className="w-full">
          Continuar a Pregunta →
        </Button>
      </div>
    );
  }

  // ========== QUESTION MODE ==========
  if (mode === 'question' && currentQuestion) {
    const questionTypeLabels: Record<ExerciseQuestion['type'], string> = {
      'identify-implicit': '🔍 Identificar Implícito',
      'classify-type': '📋 Clasificar Tipo',
      'detect-barnum': '⭐ Detectar Barnum',
      'extract-presupposition': '🎯 Presuposición',
      'spot-cold-reading': '🎭 Cold Reading',
    };

    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
          </div>
          <Progress value={currentQuestionIndex} max={questions.length} />
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
              <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full">
                {questionTypeLabels[currentQuestion.type]}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentQuestion.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? 'primary' : 'outline'}
                  onClick={() => setSelectedAnswer(index)}
                  className="h-auto text-left justify-start p-4 whitespace-normal"
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          size="lg"
          className="w-full"
        >
          Confirmar Respuesta
        </Button>
      </div>
    );
  }

  // ========== FEEDBACK MODE ==========
  if (mode === 'feedback' && currentQuestion) {
    const lastResult = results[results.length - 1];
    const correct = lastResult?.correct ?? false;

    return (
      <div className="space-y-6">
        {/* Result Badge */}
        <div className="text-center py-8">
          <div className="text-8xl mb-4">{correct ? '✅' : '❌'}</div>
          <h3 className="text-3xl font-bold mb-2">
            {correct ? '¡Correcto!' : 'Incorrecto'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Respuesta correcta: <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
          </p>
          {!correct && (
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Tu respuesta: {selectedAnswer !== null ? currentQuestion.options[selectedAnswer] : '-'}
            </p>
          )}
        </div>

        {/* Explanation */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Explicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </CardContent>
        </Card>

        <Button onClick={handleNextQuestion} size="lg" className="w-full">
          {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados 🎉'}
        </Button>
      </div>
    );
  }

  // ========== LEVEL COMPLETE MODE ==========
  if (mode === 'levelComplete') {
    const accuracy = results.length > 0
      ? (results.filter(r => r.correct).length / results.length) * 100
      : 0;
    const avgResponseTime = results.length > 0
      ? results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
      : 0;
    const passed = accuracy >= 70;

    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-8xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-2">
            {passed ? '¡Nivel Completado!' : 'Sigue Practicando'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {passed
              ? '¡Excelente trabajo! Has demostrado comprensión de la escucha activa.'
              : 'Revisa la teoría y vuelve a intentarlo. Necesitas 70% para avanzar.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {accuracy.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Precisión</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {(avgResponseTime / 1000).toFixed(1)}s
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tiempo Promedio</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Respuestas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Correctas</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {results.filter(r => r.correct).length} / {results.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Incorrectas</span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {results.filter(r => !r.correct).length} / {results.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => resetExercise()} variant="outline" className="flex-1">
            Repetir Nivel
          </Button>
          {passed && (
            <Button onClick={() => onComplete(results[0])} className="flex-1">
              Continuar
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;

  // ========== HANDLERS ==========
  function handleSubmit() {
    if (selectedAnswer === null || !currentQuestion) return;

    const responseTime = Date.now() - startTime;
    const correct = selectedAnswer === currentQuestion.correctAnswer;

    const result: ActiveListeningExerciseResult = {
      correct,
      responseTime,
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
    };

    setResults([...results, result]);
    setMode('feedback');
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setStartTime(Date.now());
      setMode('conversation');
    } else {
      setMode('levelComplete');
    }
  }

  function resetExercise() {
    setMode('theory');
    setCurrentQuestionIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setStartTime(Date.now());
  }
}
