import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const normalise = value => value.toLowerCase().replace(/[_./-]+/g, ' ').replace(/\s+/g, ' ').trim();
const allowed = new Set(['.txt', '.doc', '.docx', '.pdf', '.cpp', '.h', '.md', '.csv', '.jpeg', '.jpg', '.png', '.webp', '.gif']);
const images = new Set(['.jpeg', '.jpg', '.png', '.webp', '.gif']);

async function listFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const path = join(directory, entry.name);
        // Team avatar artwork is not an engineering archive record.
        if (entry.isDirectory() && entry.name !== 'photos') files.push(...await listFiles(path));
        else if (entry.isFile() && allowed.has(extname(entry.name).toLowerCase())) files.push(path);
    }
    return files;
}

const files = (await listFiles(join(root, 'docs'))).map(path => {
    const name = basename(path);
    const extension = extname(name).slice(1).toUpperCase();
    const match = name.match(/^(\d{4}-\d{2}-\d{2})_([^_]+)_(.+)$/);
    const stem = name.slice(0, -(extension.length + 1));
    const category = match?.[2] || (images.has(extname(name).toLowerCase()) ? 'Photo' : 'General');
    const title = (match ? match[3].slice(0, -(extension.length + 1)) : stem)
        .replace(/_/g, ' ').replace(/\./g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
    const pathInRepo = relative(root, path).split('\\').join('/');
    const href = pathInRepo.split('/').map(encodeURIComponent).join('/');
    const date = match?.[1] || '';
    return { name, extension, category, title, href, date, pathInRepo };
}).sort((a, b) => b.date.localeCompare(a.date) || b.name.localeCompare(a.name));

const cards = files.map(file => {
    const search = escape(normalise([file.name, file.category, file.title, file.extension, file.pathInRepo].join(' ')));
    return '                <article class="doc-card" data-search="' + search + '" data-category="' + escape(file.category) + '" data-type="' + file.extension + '">\n'
        + '                    <span class="doc-icon" aria-hidden="true">' + file.extension + '</span>\n'
        + '                    <div class="doc-info"><span class="doc-category">' + escape(file.category) + '</span><h3>' + escape(file.title) + '</h3><div class="doc-meta"><span>' + file.extension + '</span>' + (file.date ? '<time datetime="' + file.date + '">' + file.date + '</time>' : '<span>Undated record</span>') + '</div></div>\n'
        + '                    <a class="download-link" href="' + file.href + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + escape(file.title) + ' (' + file.extension + ')">Open <span aria-hidden="true">↗</span></a>\n'
        + '                </article>';
}).join('\n');

function options(values, label) {
    return '<option value="">' + label + '</option>' + [...new Set(values)].sort().map(value => '<option value="' + escape(value) + '">' + escape(value) + '</option>').join('');
}

const pagePath = join(root, 'docs.html');
let page = await readFile(pagePath, 'utf8');
if (!page.includes('<!-- ARCHIVE_START -->') || !page.includes('<!-- ARCHIVE_END -->')) throw new Error('Archive markers are missing from docs.html');
page = page.replace(/(<!-- ARCHIVE_START -->)[\s\S]*?(<!-- ARCHIVE_END -->)/, (_, start, end) => start + '\n' + cards + '\n                ' + end);
page = page.replace(/(<select id="doc-category">)[\s\S]*?(<\/select>)/, (_, start, end) => start + options(files.map(file => file.category), 'All categories') + end);
page = page.replace(/(<select id="doc-type">)[\s\S]*?(<\/select>)/, (_, start, end) => start + options(files.map(file => file.extension), 'All file types') + end);
page = page.replace(/(<p id="doc-count"[^>]*>)[\s\S]*?(<\/p>)/, (_, start, end) => start + files.length + ' archive files' + end);
await writeFile(pagePath, page);
console.log('Indexed ' + files.length + ' archive files, including nested notes. No API requests are needed at runtime.');
