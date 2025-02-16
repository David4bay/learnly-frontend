<script setup>
import { onMounted, reactive, defineProps, defineEmits, computed, ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

let db = ref({
    "mcquestions": [
      {
        "id": 1,
        "question": "What is the chemical symbol for water?",
        "options": ["CO2", "H2O", "O2", "NaCl"],
        "answer": "H2O"
      },
      {
        "id": 2,
        "question": "Which planet is known as the Red Planet?",
        "options": ["Venus", "Mars", "Jupiter", "Saturn"],
        "answer": "Mars"
      },
      {
        "id": 3,
        "question": "What is the smallest unit of life?",
        "options": ["Atom", "Cell", "Molecule", "Organ"],
        "answer": "Cell"
      },
      {
        "id": 4,
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
        "answer": "Mitochondria"
      },
      {
        "id": 5,
        "question": "What is the boiling point of water in Celsius?",
        "options": ["50°C", "75°C", "100°C", "120°C"],
        "answer": "100°C"
      },
      {
        "id": 6,
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        "answer": "William Shakespeare"
      },
      {
        "id": 7,
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "answer": "Paris"
      },
      {
        "id": 8,
        "question": "Which country is famous for the Great Wall?",
        "options": ["India", "China", "Japan", "Russia"],
        "answer": "China"
      },
      {
        "id": 9,
        "question": "What is the largest mammal in the world?",
        "options": ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        "answer": "Blue Whale"
      },
      {
        "id": 10,
        "question": "What is the currency of Japan?",
        "options": ["Yen", "Dollar", "Euro", "Peso"],
        "answer": "Yen"
      }
    ],
    "dragdropquestions": [
      {
        "id": 1,
        "title": "Match the Element to Its Symbol",
        "items": ["Hydrogen", "Carbon", "Oxygen", "Sodium", "Gold"],
        "targets": ["H", "C", "O", "Na", "Au"],
        "correctMatches": {
          "Hydrogen": "H",
          "Carbon": "C",
          "Oxygen": "O",
          "Sodium": "Na",
          "Gold": "Au"
        }
      },
      {
        "id": 2,
        "title": "Match the Animal to Its Habitat",
        "items": ["Polar Bear", "Dolphin", "Camel", "Kangaroo", "Penguin"],
        "targets": ["Arctic", "Ocean", "Desert", "Australia", "Antarctica"],
        "correctMatches": {
          "Polar Bear": "Arctic",
          "Dolphin": "Ocean",
          "Camel": "Desert",
          "Kangaroo": "Australia",
          "Penguin": "Antarctica"
        }
      },
      {
        "id": 3,
        "title": "Match the Country to Its Flag",
        "items": ["USA", "Japan", "France", "Canada", "Brazil"],
        "targets": ["🇺🇸", "🇯🇵", "🇫🇷", "🇨🇦", "🇧🇷"],
        "correctMatches": {
          "USA": "🇺🇸",
          "Japan": "🇯🇵",
          "France": "🇫🇷",
          "Canada": "🇨🇦",
          "Brazil": "🇧🇷"
        }
      },
      {
        "id": 4,
        "title": "Match the Scientist to Their Discovery",
        "items": ["Isaac Newton", "Marie Curie", "Albert Einstein", "Charles Darwin", "Gregor Mendel"],
        "targets": ["Gravity", "Radioactivity", "Relativity", "Evolution", "Genetics"],
        "correctMatches": {
          "Isaac Newton": "Gravity",
          "Marie Curie": "Radioactivity",
          "Albert Einstein": "Relativity",
          "Charles Darwin": "Evolution",
          "Gregor Mendel": "Genetics"
        }
      },
      {
        "id": 5,
        "title": "Match the Fruit to Its Color",
        "items": ["Apple", "Banana", "Orange", "Strawberry", "Blueberry"],
        "targets": ["Red", "Yellow", "Orange", "Red", "Blue"],
        "correctMatches": {
          "Apple": "Red",
          "Banana": "Yellow",
          "Orange": "Orange",
          "Strawberry": "Red",
          "Blueberry": "Blue"
        }
      }
    ]
  })

const props = defineProps({
    score: {
        type: Number,
        required: true
    },
    goal: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:score'])
const router = useRouter()

const state = reactive({
    mcquestions: {},
    isAnswered: false,
    isCorrect: false,
    showAlert: false,
    alertMessage: '',
    isComplete: false
})

let currentQuestion = ref(0)
let selectedOption = ref(null)

const isLastQuestion = computed(() => {
    return currentQuestion.value === state.mcquestions.length - 1
})

const checkAnswer = () => {
    if (!selectedOption.value) {
        state.showAlert = true
        state.alertMessage = 'Please select an answer first'
        return
    }

    const correctAnswer = state.mcquestions[currentQuestion.value].answer
    state.isAnswered = true
    state.isCorrect = selectedOption.value === correctAnswer
    state.showAlert = true
    
    if (state.isCorrect) {
        const newScore = props.score + 5
        emit('update:score', newScore)
        state.alertMessage = 'Correct! Well done!'
        
        // Check if goal is reached
        if (newScore >= props.goal) {
            state.isComplete = true
            state.alertMessage = `Congratulations! You've reached the goal with ${newScore} points!`
        }
    } else {
        state.alertMessage = `Incorrect. The correct answer is ${correctAnswer}`
    }
}

const nextQuestion = () => {
    if (state.isComplete) {
        return
    }
    
    if (currentQuestion.value < state.mcquestions.length - 1) {
        currentQuestion.value++
        selectedOption.value = null
        state.isAnswered = false
        state.showAlert = false
    } else {
        state.isComplete = true
        state.alertMessage = `Quiz complete! Your final score is ${props.score} points!`
        state.showAlert = true
    }
}

const selectOption = (option) => {
    if (!state.isAnswered && !state.isComplete) {
        selectedOption.value = option
        state.showAlert = false
    }
}

const restartQuestion = () => {
    selectedOption.value = null
    state.isAnswered = false
    state.showAlert = false
    state.alertMessage = ''
}

onMounted(() => {
    try {
        // const response = await axios.get(db)
        // console.log("response", response.data)
        state.mcquestions = db.value.mcquestions
    } catch (error) {
        console.error("could not fetch multiple choice questions")
        state.showAlert = true
        state.alertMessage = 'Error loading questions. Please try again.'
    }
})
</script>
<style scoped>
            section {
                margin-left: 15px;
            }
            
            ul {
                counter-reset: alpha;
            }
            
            div {
                margin-top: 15px;
            }
            
            li::before {
                counter-increment: alpha;
                content: counter(alpha, upper-alpha) ".   ";
            }
            
            li {
                list-style: none;
                margin-top: 10px;
                padding: 20px;
                border: 3px solid #F7F7F7;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .selected {
                background-color: #e0e0ff;
                border-color: #b0b0ff;
            }
            
            .correct {
                background-color: #d4edda;
                border-color: #c3e6cb;
            }
            
            .incorrect {
                background-color: #f8d7da;
                border-color: #f5c6cb;
            }
            
            .alert {
                padding: 10px;
                border-radius: 4px;
                margin-bottom: 15px;
            }
            
            .alert-success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .alert-error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            
            button {
                padding: 10px 20px;
                border-radius: 4px;
                border: none;
                background-color: #480099;
                color: white;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            button:hover {
                background-color: #0056b3;
            }
            
            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            
            .restart__Question {
                margin-right: 20px;
                background-color: #fff;
                border: 1px solid gray;
                color: gray;
            }
            
            .restart__Question:hover {
                background-color: 480099;
                color: white;
            }
            </style>
<template>
    <section v-if="state.mcquestions.length >= 0">
        <div v-if="state.showAlert" 
             :class="['alert', state.isCorrect ? 'alert-success' : 'alert-error']">
            {{ state.alertMessage }}
        </div>

        <template v-if="!state.isComplete">
            <h3>Question {{ currentQuestion + 1 }}</h3>
            <div>
                <p>{{ state.mcquestions[currentQuestion]?.question }}</p>
                <ul>
                    <li 
                        v-for="option in state.mcquestions[currentQuestion]?.options" 
                        :key="option"
                        @click="selectOption(option)"
                        :class="{
                            'selected': selectedOption === option && !state.isAnswered,
                            'correct': state.isAnswered && option === state.mcquestions[currentQuestion].answer,
                            'incorrect': state.isAnswered && selectedOption === option && option !== state.mcquestions[currentQuestion].answer
                        }"
                    >
                        {{ option }}
                    </li>
                </ul>
            </div>
            <div>
                <button @click="restartQuestion" class="restart__Question" 
                        :disabled="!selectedOption && !state.isAnswered">↺</button>
                <button 
                    v-if="!state.isAnswered"
                    @click="checkAnswer"
                    :disabled="!selectedOption"
                >
                    Answer
                </button>
                <button 
                    v-else
                    @click="nextQuestion"
                    :disabled="isLastQuestion && !state.isComplete"
                >
                    Continue
                </button>
            </div>
        </template>
    </section>
    <section v-else>
        <h3>Loading...</h3>
    </section>
</template>