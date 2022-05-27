<template><h3 id="打包背景" tabindex="-1"><a class="header-anchor" href="#打包背景" aria-hidden="true">#</a> 打包背景</h3>
<ul>
<li>build 完就直接用本地浏览器访问，结果出现黑块</li>
</ul>
<h3 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h3>
<ul>
<li>
<p>打开 <code>.vuepress/config.js</code> 文件，把 <code>base</code> 的值改成 <code>./</code>，为了方便调试，最好这样写</p>
</li>
<li>
<p>把 <code>mode: 'history'</code>, 注释掉就行了（让它默认为 <code>hash</code> 模式）。</p>
</li>
<li>
<p>然后打开项目下的 <code>node_modules\@vuepress\core\lib\client</code> 下的 <code>app.js</code> 文件，找到下方这个片段：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> routerBase<span class="token punctuation">,</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"history"</span><span class="token punctuation">,</span> <span class="token comment">// 注释mode</span>
  <span class="token literal-property property">fallback</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  routes<span class="token punctuation">,</span>
  <span class="token function">scrollBehavior</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> savedPosition</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>savedPosition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> savedPosition<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>$vuepress<span class="token punctuation">.</span><span class="token function">$get</span><span class="token punctuation">(</span><span class="token string">"disableScrollBehavior"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">selector</span><span class="token operator">:</span> <span class="token function">decodeURIComponent</span><span class="token punctuation">(</span>to<span class="token punctuation">.</span>hash<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></template>
