<template><h1 id="chrome-直接编辑文件" tabindex="-1"><a class="header-anchor" href="#chrome-直接编辑文件" aria-hidden="true">#</a> Chrome 直接编辑文件</h1>
<p>在做一些简单编写时可以尝试直接通过浏览器修改本地代码文件，例如修改样式后，本地同时变更，所见即所得。</p>
<h2 id="添加工作区" tabindex="-1"><a class="header-anchor" href="#添加工作区" aria-hidden="true">#</a> 添加工作区</h2>
<p>首先在启动的页面按下 F12 或（Ctrl + Shift + i）即可打开开发者工具。</p>
<p>将当前的开发者工具切换到 <code>Sources</code> 下，再将子内容切换至 <code>Filesystem</code>，点击提示 <code>Add folder to workspaces</code> 添加当前页面的项目（文件）目录。</p>
<h2 id="编辑内容" tabindex="-1"><a class="header-anchor" href="#编辑内容" aria-hidden="true">#</a> 编辑内容</h2>
<p>将内容添加至工作区后，可以观察到当前页面关联的文件右下角会有一个小绿点。</p>
<p>切换回 Element 标签，审查一个关联了 CSS 的元素，可以看到元素使用的 class 样式来源的文件右下角有一个的小绿点，表示该部分内容已关联。</p>
<p>修改内容：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token comment">/* 修改为 */</span>
<span class="token property">color</span><span class="token punctuation">:</span> mediumpurple<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>可以观察到浏览器的样式已经修改，回到编辑器检查，发现编辑器的内容也已经被修改了。</p>
<h2 id="更多编辑" tabindex="-1"><a class="header-anchor" href="#更多编辑" aria-hidden="true">#</a> 更多编辑</h2>
<p>在上一步演示了如何修改 CSS 的样式，但是修改 HTML 和 JavaScript 就不是那么容易的事情了。</p>
<p>首先要了解一个概念，<code>DOM Tree</code> 不等价于 HTML。当我们编辑 Element 中的内容修改的是渲染后的结果，其结果受多种因素影响，往往无法确认该修改哪一步，所以浏览器也无从处理。</p>
<p>当然编辑还是可以编辑的，回到 Sources 标签，点击对应的文件，直接进行修改，回到编辑器后就可以发现修改生效了，当拥有双屏的时候这种操作效率更低。</p>
<p>JavaScript 同理，当然在 Element 和 Sources 之间切换也是比较麻烦的事情，所以可以在 Element 标签页按下 <code>Ctrl + Shift + p</code> 接着输入 <code>qs（quick source）</code> 来同时查看两部分内容，更便于修改。</p>
</template>
