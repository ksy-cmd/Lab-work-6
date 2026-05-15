<template>
    <div class="home-view">
        <section class="hero">
            <h2>Ласкаво просимо на Освітній портал!</h2>
            <p>Обирай курси, які підходять саме тобі, та розвивайся разом з нами.</p>
            <RouterLink to="/courses" class="cta-button">Перейти до курсів</RouterLink>
        </section>
        
        <section class="features">
            <h3>Чому обирають нас?</h3>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">📚</div>
                    <h4>8+ курсів</h4>
                    <p>Широкий вибір напрямків навчання</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">👨‍🏫</div>
                    <h4>Досвідчені викладачі</h4>
                    <p>Практики з реального бізнесу</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎓</div>
                    <h4>Сертифікати</h4>
                    <p>Підтвердження знань після навчання</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💻</div>
                    <h4>Онлайн-формат</h4>
                    <p>Навчайся з будь-якої точки світу</p>
                </div>
            </div>
        </section>
        
        <section class="stats">
            <div class="stat-item">
                <span class="stat-number">10,000+</span>
                <span class="stat-label">Студентів</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Курсів</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">98%</span>
                <span class="stat-label">Задоволених</span>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-view {
    max-width: 1200px;
    margin: 0 auto;
}

.hero {
    text-align: center;
    padding: 3rem 1rem;
    background: linear-gradient(135deg, #1B4F72 0%, #2ECC71 100%);
    color: white;
    border-radius: 16px;
    margin-bottom: 2rem;
}

.hero h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.cta-button {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 2rem;
    background-color: white;
    color: #1B4F72;
    text-decoration: none;
    font-weight: 700;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: scale(1.05);
}

.features {
    margin-bottom: 2rem;
}

.features h3 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #1B4F72;
    font-size: 1.5rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.feature-card {
    background-color: white;
    padding: 1.5rem;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.feature-card h4 {
    margin-bottom: 0.5rem;
    color: #1B4F72;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    background-color: #1B4F72;
    padding: 2rem;
    border-radius: 16px;
    color: white;
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 800;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
}
</style>