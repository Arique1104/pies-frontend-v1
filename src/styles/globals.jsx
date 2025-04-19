// styles/globals.scss

.dashboard - container {
    display: flex;
}

.tabs - column {
    min - width: 200px;
    display: flex;
    flex - direction: column;
    gap: 0.5rem;
    background: #f0f0f0;
    padding: 1rem;
}

.tabs - column button {
    background: none;
    border: none;
    text - align: left;
    padding: 0.5rem;
    cursor: pointer;
}

.tabs - column.active - tab {
    font - weight: bold;
    border - left: 4px solid #3b82f6;
}