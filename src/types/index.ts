// Інтерфейс моделі даних Course (згідно варіанту 5)
export interface Course {
    id: number;
    title: string;
    subject: string;      // предмет/категорія
    duration: number;     // тривалість у тижнях
    level: string;        // рівень: 'Початковий', 'Середній', 'Просунутий'
    description: string;  // ДОДАТКОВЕ ПОЛЕ
    imageUrl?: string;    // опціональне поле для зображення
}

// Тип для користувача (для сторінки Profile)
export interface UserProfile {
    name: string;
    email: string;
    enrolledCourses: number[];
}