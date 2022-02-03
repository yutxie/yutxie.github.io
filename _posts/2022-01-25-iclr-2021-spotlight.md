---
layout: post
published: true
title: ICLR 2021 Spotlight 寻找新颖多样的药物分子 — 多目标约束下的药物分子编辑采样算法
date: '2021-07-21'
tags:
  - machine learning
  - drug discovery
  - molecular generation
  - markov sampling
---
> 是否有一个模型可以在偌大的分子空间中高效自动地找到同时满足多种性质又新颖多样的药物分子？是否有一个药物发现模型可以摆脱传统机器学习训练对大量实验和标注数据的需求？
今天将要介绍的MARS算法便成功实现了用AI辅助药物发现。字节跳动与上海交大、密歇根大学团队最近在ICLR 2021上发表的一篇论文中提出了一个先导化合物发现的机器学习方法，MARS算法，该模型可以通过“自学” 来生成一些质量非常高且同时满足多种性质的药物分子候选者。在富有挑战性的计算实验检验中，MARS生成的结果显著优于之前的方法，性能提升达77%。下面将简要介绍AI辅助药物发现所必须面临的困难与挑战，以及论文提出的MARS方法和实验结果，来帮助大家快速了解该工作。

完整原文：[ICLR 2021 Spotlight \| 寻找新颖多样的药物分子 — 多目标约束下的药物分子编辑采样算法](https://mp.weixin.qq.com/s/RfxKVF9nuG0_DkorTeWxJQ)

链接：[论文](https://openreview.net/forum?id=kHSu4ebxFXY)、[数据集及代码](https://github.com/yutxie/mars)

![2021-07-21.png]({{site.baseurl}}/assets/img/2021-07-21.png)
