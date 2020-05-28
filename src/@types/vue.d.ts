/**
 * Allows importing Vue components into .ts-files
 */
declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}