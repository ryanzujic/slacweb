// Example of a gene's hit against its source (reference) genome
const EXAMPLE_A_GENOMIC_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const EXAMPLE_A_CODING_SEQ = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const EXAMPLE_A_HIT_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTATTTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'

// Example of a gene hit against a non-reference genome with extensive polymorphisms
const EXAMPLE_B_GENOMIC_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGACTAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCAGTAAACAAAAGATATTTAGTCCTCAAATTAACTTTATCCCATGTCAGTGTATGGTATATTCTTAATAATTTTTTGCGGGGTACCCTCACATCATATGAATTTCTCCTTTTTTTTTGTATACCTCAAAACATGTGTTTTCCTTAATATTGCCATAAGCTAACAAAAGCATGGTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCGTAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTCTTTTTTTTTTTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATT-ATT------------------------------TTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATCTACATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCTCCCTCCCTCATTTTTCTTTGCGTATAAATTTCAAT'
const EXAMPLE_B_CODING_SEQ = '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATCCCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACAT----------------------------------------------------------------------------------------------------------------------------------------GTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAG-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
const EXAMPLE_B_HIT_SEQ = 'TGAATATTATTCTAATTTAACTAATGGCCTTAAACTTGGATACTTATGCAATTAATTAAGTTAGATACTTCAGAAAGAGAACTTTAACTATCCTAATAATCATATTCAAGTCAAACAAGATTCTATTTCCTAGAATATACATGCGAAGTAAAAAAAATGACACTATAATTGATTTTAGCATTTATTATATTTTATCATCATTGAGTGAGAATAATTTTGCTCTTATAAAAACATTTATGCCATACCAATCGACCCCATTTAAGGTTGATGATAGTGCAGCCATGCAGGGAAAGTAAACCCAAATAATAGTACGAAGTAGCTAGGCATAAAAAACTTCAAACAATATATTGTTCTCCCACTATCTAAAAACAAGAAGCCCGGCCCCCATTTTGTGGAGACCACGTATATACTCCA--------------------------------------------------------------------------------------------------------------------------------------------------------------------------GTAGCTAATACTTTTTCTCGATCTAAACCTGCATGTTTACCACTTTCATGAAACAAAAACTATGAACTATTCTTCGGGCTTTTTCATCATTCTTCTTCTGCTGCTATACCATTTCTTCCCATATTCAAGCTCGAGCATGAGAATAATGATTCAGCAAGTCACCAAAGCAGCAACAGAAAATCACCATCACATGGTAAGTATATAATTTCTTTGATATGATCCATAATCACTTTTTATTTTTTATAAGCAAGAGGAGCTTTTAAGTTCCTATCATGTTTTCTCTTC--TTTTTTTCTTGGGTGAAGTTATCATGTTTTCTTTCGTGCCAGTCAAGAGGAGCTGAGAGGGATCATGTTCAAAGGAAAGCATTGCATGAAGTACACTCAGGACCTAATCCTATCAGTAACTCCATTCCACAACAGAAGTTGAAAAATATACAAAGAAATCATATGCATTAGGTCTTCTTTTGTATGTTAATTAATTATTTTTTCCTTTTCTTAATAGTAAACTCTCTTTTCCTTTTCTGTTCTTTGTTCTTTCTTTCCCTCCCTTCCTCATATTTGTTACACATATTTCATGAGTCAGCTTTGAATCATGCATAATGAATATAAATTCAGATTGATGCATAACTATAGCTAGCATGACCATCTTCAGTTCTTCACTCTTTTCATTGTGTTATACTGTTATTATCCCTCCCTCCCTCCCT--CT--CTCATTTTTCTTTGCGTATAAATTTCAAT'

const DEFAULT_SLAC_LENGTH = 30;

// Internal variables to track user inputs to allow re-querying backend on SLAC length change.
// In terms of efficiency, it's not ideal re-running the whole thing each time but we'll cross that bridge when we need to.
let lastInputMethod = null;
let miniSlacLength = null;

// Table showing how SLAC encodes positions/blocks of the alignment
const slacEncodingInfoTable = [
    { label: 'Coding match', full: '|', partial: '!' },
    { label: 'Coding mismatch', full: 'X', partial: 'x' },
    { label: 'Non-coding match', full: 'O', partial: 'o' },
    { label: 'Non-coding mixmatch', full: '.', partial: ',' },
    { label: 'Non-coding gap', full: '_', partial: '-' },
    { label: 'Coding gap', full: '=', partial: ':' },
    { label: 'Insertion', full: '^', partial: '`' }
];

// Function to generate the table
function generateTable(data) {
    let table = '<table class="table table-bordered"><thead><tr><th></th><th>Full</th><th>Partial</th></tr></thead><tbody>';
    data.forEach(row => {
        table += `<tr><td>${row.label}</td><td>${row.full}</td><td>${row.partial}</td></tr>`;
    });
    table += '</tbody></table>';
    return table;
}

// Insert the generated table into the DOM
document.getElementById('slac-encoding-table').innerHTML = generateTable(slacEncodingInfoTable);

// Load Example A - Pre-fill sequences and trigger process
document.getElementById('load-example-a').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic-seq').value = EXAMPLE_A_GENOMIC_SEQ;
    document.getElementById('coding-seq').value = EXAMPLE_A_CODING_SEQ;
    document.getElementById('hit-seq').value = EXAMPLE_A_HIT_SEQ;
    document.getElementById('process-per-sequence').click();
});

// Load Example B - Pre-fill sequences and trigger process
document.getElementById('load-example-b').addEventListener('click', () => {
    document.getElementById('per-sequence-tab').click();
    document.getElementById('genomic-seq').value = EXAMPLE_B_GENOMIC_SEQ;
    document.getElementById('coding-seq').value = EXAMPLE_B_CODING_SEQ;
    document.getElementById('hit-seq').value = EXAMPLE_B_HIT_SEQ;
    document.getElementById('process-per-sequence').click();
});

// Event listener for 'View as FASTA Text' link
document.getElementById('copy-per-sequence-to-fasta-text').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Get the sequence values from the Per Sequence tab
    const genomicSeq = document.getElementById('genomic-seq').value.trim();
    const codingSeq = document.getElementById('coding-seq').value.trim();
    const hitSeq = document.getElementById('hit-seq').value.trim();

    // Create FASTA formatted text
    let fastaText = '';

    if (genomicSeq) {
        fastaText += '>genomic\n' + genomicSeq + '\n';
    }
    if (codingSeq) {
        fastaText += '>coding\n' + codingSeq + '\n';
    }
    if (hitSeq) {
        fastaText += '>hit\n' + hitSeq + '\n';
    }

    // Set the value of the FASTA text area in the FASTA Text tab
    document.getElementById('fasta-text-input').value = fastaText;

    // Switch to the FASTA Text tab
    const fastaTextTab = new bootstrap.Tab(document.getElementById('fasta-text-tab'));
    fastaTextTab.show();
});

// Helper functions for sliders and inputs
function updateNumberInput(value) {
    document.getElementById('mini-slac-length-input').value = value;
}

function updateSliderInput(value) {
    const slider = document.getElementById('mini-slac-length');
    const numericValue = parseInt(value);
    if (numericValue >= slider.min && numericValue <= slider.max) {
        slider.value = numericValue;
    }
}

function refreshOutputsOnLengthChange() {
    let newLength = document.getElementById('mini-slac-length').value;
    // Only run if the length has changed
    if (newLength !== miniSlacLength) {
        miniSlacLength = newLength;
        if (lastInputMethod === 'process-per-sequence') {
            document.getElementById('process-per-sequence').click();
        } else if (lastInputMethod === 'process-fasta-text') {
            document.getElementById('process-fasta-text').click();
        } else if (lastInputMethod === 'process-fasta-upload') {
            document.getElementById('process-fasta-upload').click();
        }
    }
}

// Function to check if an element is in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to scroll to the miniSLAC card and log if not in view
function scrollToResults() {
    try {
        const miniSlacCard = document.querySelector('#minislac-output')
        const logAlert = document.querySelector('#log-alert');

        // Scroll to the log and output if neither is currently in view
        if (!isInViewport(miniSlacCard) && !isInViewport(logAlert)) {
            logAlert.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    } catch (error) {
        console.error('Error during scroll to results:', error);
    }
}

// Event listeners for processing buttons
document.getElementById('process-per-sequence').addEventListener('click', async () => {
    const hitSeq = document.getElementById('hit-seq').value.trim();
    const fullRefSeq = document.getElementById('genomic-seq').value.trim();
    const refContextSeq = document.getElementById('coding-seq').value.trim();
    miniSlacLength = document.getElementById('mini-slac-length').value;

    lastInputMethod = 'process-per-sequence';

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-3-input', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hitSeq, fullRefSeq, refContextSeq, miniSlacLength })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            if (data.error !== undefined && data.error) {
                throw new Error(data.error);
            }
            updateLog(`Finished`, 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

document.getElementById('process-fasta-text').addEventListener('click', async () => {
    const fastaText = document.getElementById('fasta-text-input').value.trim();
    miniSlacLength = document.getElementById('mini-slac-length').value;

    lastInputMethod = 'process-fasta-text';

    updateLog('Processing... Please wait.', 'info');

    try {
        const startTime = performance.now();
        const response = await fetch('https://slacserver.vercel.app/slac-paste-fasta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fastaText, miniSlacLength })
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2); // Unused but keeping for future reference

        if (response.ok) {
            const data = await response.json();
            if (data.error !== undefined && data.error) {
                throw new Error(data.error);
            }
            updateLog('Finished', 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

document.getElementById('process-fasta-upload').addEventListener('click', async () => {
    const fastaFile = document.getElementById('fasta_file').files[0];
    miniSlacLength = document.getElementById('mini-slac-length').value;
    
    if (!fastaFile) {
        alert('Please upload a FASTA file.');
        return;
    }
    
    lastInputMethod = 'process-fasta-upload';
    
    const formData = new FormData();
    formData.append('fastaFile', fasta_file);
    formData.append('miniSlacLength', miniSlacLength);


    updateLog('Processing... Please wait.', 'info');

    try {
        const response = await fetch('https://slacserver.vercel.app/slac-upload-fasta', {
            method: 'POST',
            body: formData
        });

        const endTime = performance.now();
        const elapsedTime = (endTime - startTime).toFixed(2);

        if (response.ok) {
            const data = await response.json();
            if (data.error !== undefined && data.error) {
                throw new Error(data.error);
            }
            updateLog('Finished', 'success');
            displayResults(data);
        } else {
            throw new Error(`Server returned status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error processing request:', error);

        // User-friendly message for network errors
        if (error.message === 'Failed to fetch') {
            updateLog('Connection error: Unable to reach the server. Please check your connection and try again.', 'danger');
        } else {
            updateLog(`Processing failed: ${error.message}`, 'danger');
        }
    }
});

// Helper function to update the log message
function updateLog(message, type = 'info') {
    const logAlert = document.getElementById('log-alert');
    logAlert.textContent = message;
    logAlert.className = 'alert alert-' + type;
}

// Displaying the generated SLAC sequences
function displayResults(data) {
    document.getElementById('minislac-output').textContent = data.mini_slac;
    document.getElementById('fullslac_output').value = data.full_slac;
    document.getElementById('seqslac_output').value = data.seq_slac;
    console.log('Processing time: ', data.time);
    scrollToResults();
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
}

// Function to show a Bootstrap toast (minimal notification)
function showToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Handle miniSLAC length changes once an output has already been generated
document.getElementById('mini-slac-length').addEventListener('change', async () => {
    refreshOutputsOnLengthChange();
});

// Copy miniSLAC output to clipboard
document.getElementById('copy-minislac').addEventListener('click', (event) => {
    const miniSlacOutput = document.getElementById('minislac-output').textContent;
    if (miniSlacOutput) {
        copyToClipboard(miniSlacOutput);
        showToast('miniSLAC Output copied to clipboard!');
    } else {
        showToast('No miniSLAC output to copy.');
    }
});

// Copy fullSLAC output to clipboard
document.getElementById('copy-fullslac').addEventListener('click', (event) => {
    const fullSlacOutput = document.getElementById('fullslac_output').value;
    if (fullSlacOutput) {
        copyToClipboard(fullSlacOutput);
        showToast('fullSLAC Output copied to clipboard!');
    } else {
        showToast('No fullSLAC output to copy.');
    }
});

// Copy seqSLAC output to clipboard
document.getElementById('copy-seqslac').addEventListener('click', (event) => {
    const seqSlacOutput = document.getElementById('seqslac_output').value;
    if (seqSlacOutput) {
        copyToClipboard(seqSlacOutput);
        showToast('seqSLAC Output copied to clipboard!');
    } else {
        showToast('No seqSLAC output to copy.');
    }
});

// Clear page on refresh and handle version display
window.addEventListener('DOMContentLoaded', () => {
    // Reset input fields and text areas
    document.getElementById('genomic-seq').value = '';
    document.getElementById('coding-seq').value = '';
    document.getElementById('hit-seq').value = '';

    // Clear textareas for SLAC outputs
    document.getElementById('fullslac_output').value = '';
    document.getElementById('minislac-output').textContent = '';
    document.getElementById('seqslac_output').value = '';

    // Reset log message to the default placeholder
    updateLog('Click process to generate outputs.', 'info');

    // Reset internal variables
    lastInputMethod = null;
    miniSlacLength = null;

    // Reset sliders and number inputs
    updateNumberInput(DEFAULT_SLAC_LENGTH);
    updateSliderInput(DEFAULT_SLAC_LENGTH);

    // Reset to the default tab
    const defaultTab = new bootstrap.Tab(document.getElementById('per-sequence-tab'));
    defaultTab.show();

    // Display the version
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        versionElement.textContent = appConfig.version;
    }
});
