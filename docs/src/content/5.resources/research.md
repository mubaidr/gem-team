---
title: Research & Benchmarks
description: Evidence base for Gem Team design decisions, including prompt caching pricing, multi-agent vs single-agent benchmarks, TDD effectiveness, model routing, context reduction, and caching research.
navigation:
  icon: i-lucide-file-text
seo:
  title: Research & Benchmarks - Gem Team
  description: "Evidence base for Gem Team design decisions: prompt caching pricing, multi-agent vs single-agent benchmarks, TDD effectiveness, model routing, context reduction, and prefix caching research."
  ogTitle: Research & Benchmarks - Gem Team
  ogDescription: Evidence base for Gem Team design decisions, with citations and URLs.
---

# Research & Benchmarks

This page documents the evidence base behind Gem Team's architectural decisions. Every claim cites a verifiable source (paper, arXiv preprint, or provider documentation) with a URL. Studies are summarized honestly, including limitations and gaps where evidence is absent or unverified.

## Executive Summary

| Research Area               | Key Finding                                                                                         | Relevance to Gem Team                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Prompt caching pricing      | Cache read ≈ 0.1× input rate (90% discount) across OpenAI, Anthropic, Google; cache write 1.25–2.5× | Supports long-lived shared context for multi-agent orchestration                                              |
| Multi-agent vs single-agent | MAS benefits diminish as LLM capability improves; overhead can be 60× latency                       | Justifies risk-gated role allocation (activate specialists only when uncertainty justifies coordination cost) |
| TDD effectiveness           | TiCoder: +45.97% absolute pass@1 across 4 LLMs, 2 Python datasets                                   | Motivates test-first interactive code generation in Gem implementer                                           |
| Model routing               | RouteLLM: >2× cost reduction without quality loss; UCCI: 31% cost reduction (95% CI [27%, 35%])     | Informs model routing between small/large models                                                              |
| Context reduction           | ReCAP: ~95% reduction in compaction/restoration latency; +19.8 to +41.2 accuracy points             | Supports context compression strategies                                                                       |
| Prefix caching systems      | Don't Break the Cache: 41–80% API cost reduction; Marconi: 34.4× higher token hit rates             | Validates caching layer investment                                                                            |

## Prompt Caching Pricing

Provider pricing for cached vs uncached input tokens. Cache read is consistently ~90% cheaper than uncached input; cache write carries a premium multiplier.

### OpenAI

Source: [developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing), [developers.openai.com/api/docs/guides/prompt-caching](https://developers.openai.com/api/docs/guides/prompt-caching)

| Parameter              | Value                                                         |
| ---------------------- | ------------------------------------------------------------- |
| Cache write multiplier | 1.25× (30-min TTL) or 2.5× (12-hr TTL) of uncached input rate |
| Cache read rate        | 0.1× base input rate (90% discount)                           |
| Example                | GPT-5.6-sol uncached $4.00/1M → cached $0.40/1M               |
| Min cacheable prefix   | 1,024 tokens (GPT-5.6+)                                       |

Break-even analysis: writing the cache once and fully reusing it once costs 1.35× vs 2× without caching; across 10 requests it costs 2.15× vs 10×.

### Anthropic

Source: [platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

| Parameter              | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Cache write multiplier | 1.25× (5-min TTL) or 2× (1-hour TTL)           |
| Cache read rate        | 0.1× base input (90% discount)                 |
| Example                | Sonnet 5.5 uncached $2.00/1M → cached $0.10/1M |

### Google Gemini

Source: [cloud.google.com/model-garden/pricing](https://cloud.google.com/model-garden/pricing), [aistudio.google.com/docs/caching](https://aistudio.google.com/docs/caching)

| Parameter                 | Value                                     |
| ------------------------- | ----------------------------------------- |
| Gemini 4 Neon input       | $3.00/1M                                  |
| Gemini 4 Neon cache read  | $0.15/1M                                  |
| Gemini 4 Neon cache write | $3.75/1M                                  |
| Min token limit           | 2,048 (2.5 Pro/Flash), 4,096 (Gemini 3/4) |

### DeepSeek

Could not verify current pricing - provider endpoints returned 403/401 blocks during research. No DeepSeek cache pricing figures are included in this page.

## Multi-Agent vs Single-Agent Benchmarks

### ProcPilot (IEEE IEMCON 2026)

Sources: [https://doi.org/10.1109/ieeeiemcon202670252.2026.11794666](https://doi.org/10.1109/ieeeiemcon202670252.2026.11794666), [https://openalex.org/W7238772809](https://openalex.org/W7238772809)

- 620 repository-task profiles across HumanEval, MBPP, SWE-bench Lite, Java, and Multi-SWE-bench
- Simulated task success: 37.4% → 42.8%
- Conformance: 93.2%
- Token reduction vs fixed pipelines
- **Risk-gated role allocation**: specialist agents are activated only when uncertainty justifies the coordination cost

### MAFBench (arXiv:2602.03128)

Source: [https://arxiv.org/abs/2602.03128](https://arxiv.org/abs/2602.03128)

- Orchestration alone increases latency 60×
- Schema-constrained planning reduces accuracy up to 32 points
- Communication topology: coordination success drops from >90% to <30% under topology mismatch

### arXiv:2505.18286

Source: [https://arxiv.org/abs/2505.18286](https://arxiv.org/abs/2505.18286)

- Benefits of multi-agent systems (MAS) over single-agent systems (SAS) diminish as LLM capabilities improve

### ChainSWE (EMNLP 2026)

Source: [https://doi.org/10.18653/2026.emnlp-main.371](https://doi.org/10.18653/2026.emnlp-main.371)

- Performance drop up to 70% as chain length increases, due to context-carrying challenges

## TDD Effectiveness

### TiCoder (IEEE TSE 2024)

Sources: [https://arxiv.org/abs/2404.10100](https://arxiv.org/abs/2404.10100), [https://doi.org/10.1109/TSE.2024.3428972](https://doi.org/10.1109/TSE.2024.3428972)

- 45.97% absolute pass@1 improvement across 4 LLMs and 2 Python datasets
- 15 programmers in a user study: more likely to correctly evaluate AI-generated code, with less cognitive load
- Test-driven interactive code generation

## Model Routing

### RouteLLM (ICLR 2025)

Source: [https://arxiv.org/abs/2406.18665](https://arxiv.org/abs/2406.18665)

- > 2× cost reduction without quality loss
- Transfer learning across model pairs

### Hybrid LLM (ICLR 2024)

Source: [https://proceedings.iclr.cc/paper_files/paper/2024/hash/b47d93c99fa22ac0b377578af0a1f63a-Abstract-Conference.html](https://proceedings.iclr.cc/paper_files/paper/2024/hash/b47d93c99fa22ac0b377578af0a1f63a-Abstract-Conference.html)

- Up to 40% fewer calls to the large model with no quality drop

### UCCI (arXiv:2605.18796)

Source: [https://arxiv.org/abs/2605.18796](https://arxiv.org/abs/2605.18796)

- 31% cost reduction (95% CI [27%, 35%]) on 75k queries

## Context Reduction

### ReCAP (arXiv:2609.40118)

Source: [https://arxiv.org/abs/2609.40118](https://arxiv.org/abs/2609.40118)

- ~95% reduction in compaction/restoration latency
- Halves historical context per call
- Accuracy improvement +19.8 to +41.2 points

### State Compression (arXiv:2607.18265)

Source: [https://arxiv.org/abs/2607.18265](https://arxiv.org/abs/2607.18265)

- JSON hand-off extraction: 0.96 feasibility vs narrative summarization's 0.48

### Token Optimization (arXiv:2608.17188)

Source: [https://arxiv.org/abs/2608.17188](https://arxiv.org/abs/2608.17188)

- 60–70% token reduction in production
- Latency: 3.5–10.5 minutes → 61–116 seconds

## Prefix Caching Research

### Don't Break the Cache (arXiv:2601.06007)

Source: [https://arxiv.org/abs/2601.06007](https://arxiv.org/abs/2601.06007)

- 41–80% API cost reduction
- 13–31% TTFT (time-to-first-token) improvement
- Evaluated across OpenAI, Anthropic, and Google

### KVFlow (arXiv:2507.07400)

Source: [https://arxiv.org/abs/2507.07400](https://arxiv.org/abs/2507.07400)

- Up to 2.19× speedup for concurrent multi-agent workflows

### Marconi (arXiv:2411.19379)

Source: [https://arxiv.org/abs/2411.19379](https://arxiv.org/abs/2411.19379)

- 34.4× higher token hit rates
- 617ms lower TTFT

## How This Applies to Gem Team

| Research Finding                                                             | Gem Team Implementation Decision                                                                                                 |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Cache read ≈ 0.1× input (90% discount) across providers                      | Invest in a shared prompt-caching layer so multi-agent context prefixes are reused across turns                                  |
| Cache write premium 1.25–2.5×; break-even at ~2–10 reuses                    | Only cache context expected to be reused; avoid caching one-off prefixes                                                         |
| Min cacheable prefix 1,024–4,096 tokens                                      | Set minimum context size thresholds before attempting to cache                                                                   |
| MAS benefits diminish as LLM capability improves; overhead up to 60× latency | Use risk-gated role allocation: activate specialist agents only when uncertainty justifies coordination cost (ProcPilot pattern) |
| Schema-constrained planning reduces accuracy up to 32 points (MAFBench)      | Avoid over-constraining agent planning schemas; prefer flexible schemas                                                          |
| Communication topology mismatch drops success from >90% to <30% (MAFBench)   | Standardize agent communication topology; validate topology against task type                                                    |
| TiCoder: +45.97% pass@1 with test-driven interactive generation              | Implement test-first code generation in the Gem implementer agent                                                                |
| RouteLLM: >2× cost reduction without quality loss                            | Implement model routing between smaller and larger models based on task complexity                                               |
| Hybrid LLM: up to 40% fewer calls to large model                             | Route simple sub-tasks to smaller models; reserve large models for complex reasoning                                             |
| UCCI: 31% cost reduction (95% CI [27%, 35%])                                 | Target similar cost-reduction range in production routing                                                                        |
| ReCAP: ~95% reduction in compaction/restoration latency                      | Implement context compaction and restoration with measurable latency targets                                                     |
| State Compression: JSON feasibility 0.96 vs narrative 0.48                   | Use structured JSON hand-offs between agents rather than narrative summaries                                                     |
| Don't Break the Cache: 41–80% cost reduction                                 | Build a caching layer targeting this cost-reduction range                                                                        |
| KVFlow: up to 2.19× speedup for concurrent multi-agent workflows             | Support concurrent agent execution with shared KV cache                                                                          |
| Marconi: 34.4× higher token hit rates                                        | Optimize cache key design for high token hit rates                                                                               |

## Gaps and Uncertainties

The following limitations should be considered when applying this research:

- **DeepSeek pricing unverified**: Provider endpoints returned 403/401 blocks during research; no DeepSeek cache pricing figures are included.
- **No direct study comparing risk-based review vs uniform review**: The risk-gated role allocation design (inspired by ProcPilot) lacks a head-to-head study against uniform review.
- **No production case studies with dollar amounts**: All cited figures are from academic benchmarks or provider documentation; no Gem Team production deployment data with dollar amounts is available.

## Reference List

1. OpenAI - Pricing. https://developers.openai.com/api/docs/pricing
2. OpenAI - Prompt Caching Guide. https://developers.openai.com/api/docs/guides/prompt-caching
3. Anthropic - Prompt Caching. https://platform.claude.com/docs/en/build-with-claude/prompt-caching
4. Google Cloud - Model Garden Pricing. https://cloud.google.com/model-garden/pricing
5. Google AI Studio - Caching. https://aistudio.google.com/docs/caching
6. ProcPilot (IEEE IEMCON 2026). https://doi.org/10.1109/ieeeiemcon202670252.2026.11794666 - OpenAlex: https://openalex.org/W7238772809
7. MAFBench (arXiv:2602.03128). https://arxiv.org/abs/2602.03128
8. MAS vs SAS benefits diminish (arXiv:2505.18286). https://arxiv.org/abs/2505.18286
9. ChainSWE (EMNLP 2026). https://doi.org/10.18653/2026.emnlp-main.371
10. TiCoder (IEEE TSE 2024). https://arxiv.org/abs/2404.10100 - https://doi.org/10.1109/TSE.2024.3428972
11. RouteLLM (ICLR 2025). https://arxiv.org/abs/2406.18665
12. Hybrid LLM (ICLR 2024). https://proceedings.iclr.cc/paper_files/paper/2024/hash/b47d93c99fa22ac0b377578af0a1f63a-Abstract-Conference.html
13. UCCI (arXiv:2605.18796). https://arxiv.org/abs/2605.18796
14. ReCAP (arXiv:2609.40118). https://arxiv.org/abs/2609.40118
15. State Compression (arXiv:2607.18265). https://arxiv.org/abs/2607.18265
16. Token Optimization (arXiv:2608.17188). https://arxiv.org/abs/2608.17188
17. Don't Break the Cache (arXiv:2601.06007). https://arxiv.org/abs/2601.06007
18. KVFlow (arXiv:2507.07400). https://arxiv.org/abs/2507.07400
19. Marconi (arXiv:2411.19379). https://arxiv.org/abs/2411.19379
