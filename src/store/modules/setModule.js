export const setModule = {
    state: () => ({
        slides: +localStorage.getItem('slides') || 1,
        stages: +localStorage.getItem('stages') || 5,
    }),
    mutations: {
        setSlides(state, payload) {
            state.slides = payload;
            localStorage.setItem('slides', payload);
        },
        setStages(state, payload) {
            state.stages = payload;
            localStorage.setItem('stages', payload);
        }
    },
}