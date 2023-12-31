/* eslint-disable */

import React from 'react';
import { Divider, Collapse } from 'antd';
import { VERSION } from 'constants/settings';

const { Panel } = Collapse;

const data = [
  {
    title: `Release Notes (10.9.0-rc.3) - 15/11/2023`,
    content: (
      <>
        <>
          <p>OM5K-11555 - <a href="https://dev.diamondkey.com/browse/OM5K-11555">https://dev.diamondkey.com/browse/OM5K-11555</a></p>
          <p>OM5K-11556 - <a href="https://dev.diamondkey.com/browse/OM5K-11556">https://dev.diamondkey.com/browse/OM5K-11556</a></p>
          <p>OM5K-11557 - <a href="https://dev.diamondkey.com/browse/OM5K-11557">https://dev.diamondkey.com/browse/OM5K-11557</a></p>
          <p>OM5K-11558 - <a href="https://dev.diamondkey.com/browse/OM5K-11558">https://dev.diamondkey.com/browse/OM5K-11558</a></p>
          <p>OM5K-11559 - <a href="https://dev.diamondkey.com/browse/OM5K-11559">https://dev.diamondkey.com/browse/OM5K-11559</a></p>
          <p>OM5K-11560 - <a href="https://dev.diamondkey.com/browse/OM5K-11560">https://dev.diamondkey.com/browse/OM5K-11560</a></p>
          <p>OM5K-11561 - <a href="https://dev.diamondkey.com/browse/OM5K-11561">https://dev.diamondkey.com/browse/OM5K-11561</a></p>
          <p>OM5K-11562 - <a href="https://dev.diamondkey.com/browse/OM5K-11562">https://dev.diamondkey.com/browse/OM5K-11562</a></p>
          <p>OM5K-11563 - <a href="https://dev.diamondkey.com/browse/OM5K-11563">https://dev.diamondkey.com/browse/OM5K-11563</a></p>
          <p>OM5K-11573 - <a href="https://dev.diamondkey.com/browse/OM5K-11573">https://dev.diamondkey.com/browse/OM5K-11573</a></p>
          <p>OM5K-11574 - <a href="https://dev.diamondkey.com/browse/OM5K-11574">https://dev.diamondkey.com/browse/OM5K-11574</a></p>
          <p>OM5K-11576 - <a href="https://dev.diamondkey.com/browse/OM5K-11576">https://dev.diamondkey.com/browse/OM5K-11576</a></p>
          <p>OM5K-11596 - <a href="https://dev.diamondkey.com/browse/OM5K-11596">https://dev.diamondkey.com/browse/OM5K-11596</a></p>
          <p>OM5K-11261 - <a href="https://dev.diamondkey.com/browse/OM5K-11261">https://dev.diamondkey.com/browse/OM5K-11261</a></p>
          <p>OM5K-11516 - <a href="https://dev.diamondkey.com/browse/OM5K-11516">https://dev.diamondkey.com/browse/OM5K-11516</a></p>
          <p>OM5K-11527 - <a href="https://dev.diamondkey.com/browse/OM5K-11527">https://dev.diamondkey.com/browse/OM5K-11527</a></p>
          <p>OM5K-11327 - <a href="https://dev.diamondkey.com/browse/OM5K-11327">https://dev.diamondkey.com/browse/OM5K-11327</a></p>
          <p>OM5K-11328 - <a href="https://dev.diamondkey.com/browse/OM5K-11328">https://dev.diamondkey.com/browse/OM5K-11328</a></p>
          <p>OM5K-11472 - <a href="https://dev.diamondkey.com/browse/OM5K-11472">https://dev.diamondkey.com/browse/OM5K-11472</a></p>
          <p>OM5K-11499 - <a href="https://dev.diamondkey.com/browse/OM5K-11499">https://dev.diamondkey.com/browse/OM5K-11499</a></p>
          <p>OM5K-11523 - <a href="https://dev.diamondkey.com/browse/OM5K-11523">https://dev.diamondkey.com/browse/OM5K-11523</a></p>
          <p>OM5K-11546 - <a href="https://dev.diamondkey.com/browse/OM5K-11546">https://dev.diamondkey.com/browse/OM5K-11546</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.9.0-rc.2) - 18/09/2023`,
    content: (
      <>
        <>
          <p>OM5K-11480 - <a href="https://dev.diamondkey.com/browse/OM5K-11480">https://dev.diamondkey.com/browse/OM5K-11480</a></p>
          <p>OM5K-11491 - <a href="https://dev.diamondkey.com/browse/OM5K-11491">https://dev.diamondkey.com/browse/OM5K-11491</a></p>
          <p>OM5K-11504 - <a href="https://dev.diamondkey.com/browse/OM5K-11504">https://dev.diamondkey.com/browse/OM5K-11504</a></p>
          <p>OM5K-11441 - <a href="https://dev.diamondkey.com/browse/OM5K-11441">https://dev.diamondkey.com/browse/OM5K-11441</a></p>
          <p>OM5K-11497 - <a href="https://dev.diamondkey.com/browse/OM5K-11497">https://dev.diamondkey.com/browse/OM5K-11497</a></p>
          <p>OM5K-11510 - <a href="https://dev.diamondkey.com/browse/OM5K-11510">https://dev.diamondkey.com/browse/OM5K-11510</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.9.0-rc.1) - 12/09/2023`,
    content: (
      <>
        <>
          <p>OM5K-11410 - <a href="https://dev.diamondkey.com/browse/OM5K-11410">https://dev.diamondkey.com/browse/OM5K-11410</a></p>
          <p>OM5K-11411 - <a href="https://dev.diamondkey.com/browse/OM5K-11411">https://dev.diamondkey.com/browse/OM5K-11411</a></p>
          <p>OM5K-11478 - <a href="https://dev.diamondkey.com/browse/OM5K-11478">https://dev.diamondkey.com/browse/OM5K-11478</a></p>
          <p>OM5K-11479 - <a href="https://dev.diamondkey.com/browse/OM5K-11479">https://dev.diamondkey.com/browse/OM5K-11479</a></p>
          <p>OM5K-11430 - <a href="https://dev.diamondkey.com/browse/OM5K-11430">https://dev.diamondkey.com/browse/OM5K-11430</a></p>
          <p>OM5K-11367 - <a href="https://dev.diamondkey.com/browse/OM5K-11367">https://dev.diamondkey.com/browse/OM5K-11367</a></p>
          <p>OM5K-11468 - <a href="https://dev.diamondkey.com/browse/OM5K-11468">https://dev.diamondkey.com/browse/OM5K-11468</a></p>
          <p>OM5K-11477 - <a href="https://dev.diamondkey.com/browse/OM5K-11477">https://dev.diamondkey.com/browse/OM5K-11477</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.10) - 11/08/2023`,
    content: (
      <>
        <>
          <p>OM5K-11380 - <a href="https://dev.diamondkey.com/browse/OM5K-11380">https://dev.diamondkey.com/browse/OM5K-11380</a></p>
          <p>OM5K-11382 - <a href="https://dev.diamondkey.com/browse/OM5K-11382">https://dev.diamondkey.com/browse/OM5K-11382</a></p>
          <p>OM5K-11383 - <a href="https://dev.diamondkey.com/browse/OM5K-11383">https://dev.diamondkey.com/browse/OM5K-11383</a></p>
          <p>OM5K-11416 - <a href="https://dev.diamondkey.com/browse/OM5K-11416">https://dev.diamondkey.com/browse/OM5K-11416</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.9) - 04/08/2023`,
    content: (
      <>
        <>
          <p>OM5K-11346 - <a href="https://dev.diamondkey.com/browse/OM5K-11346">https://dev.diamondkey.com/browse/OM5K-11346</a></p>
          <p>OM5K-11347 - <a href="https://dev.diamondkey.com/browse/OM5K-11347">https://dev.diamondkey.com/browse/OM5K-11347</a></p>
          <p>OM5K-11349 - <a href="https://dev.diamondkey.com/browse/OM5K-11349">https://dev.diamondkey.com/browse/OM5K-11349</a></p>
          <p>OM5K-11376 - <a href="https://dev.diamondkey.com/browse/OM5K-11376">https://dev.diamondkey.com/browse/OM5K-11376</a></p>
          <p>OM5K-11371 - <a href="https://dev.diamondkey.com/browse/OM5K-11371">https://dev.diamondkey.com/browse/OM5K-11371</a></p>
          <p>OM5K-11374 - <a href="https://dev.diamondkey.com/browse/OM5K-11374">https://dev.diamondkey.com/browse/OM5K-11374</a></p>
          <p>OM5K-11370 - <a href="https://dev.diamondkey.com/browse/OM5K-11370">https://dev.diamondkey.com/browse/OM5K-11370</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.8) - 01/08/2023`,
    content: (
      <>
        <>
          <p>OM5K-11362 - <a href="https://dev.diamondkey.com/browse/OM5K-11362">https://dev.diamondkey.com/browse/OM5K-11362</a></p>
          <p>OM5K-11364 - <a href="https://dev.diamondkey.com/browse/OM5K-11364">https://dev.diamondkey.com/browse/OM5K-11364</a></p>
          <p>OM5K-11351 - <a href="https://dev.diamondkey.com/browse/OM5K-11351">https://dev.diamondkey.com/browse/OM5K-11351</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.7) - 18/07/2023`,
    content: (
      <>
        <>
          <p>OM5K-11281 - <a href="https://dev.diamondkey.com/browse/OM5K-11281">https://dev.diamondkey.com/browse/OM5K-11281</a></p>
          <p>OM5K-11293 - <a href="https://dev.diamondkey.com/browse/OM5K-11293">https://dev.diamondkey.com/browse/OM5K-11293</a></p>
          <p>OM5K-11294 - <a href="https://dev.diamondkey.com/browse/OM5K-11294">https://dev.diamondkey.com/browse/OM5K-11294</a></p>
          <p>OM5K-11297 - <a href="https://dev.diamondkey.com/browse/OM5K-11297">https://dev.diamondkey.com/browse/OM5K-11297</a></p>
          <p>OM5K-11303 - <a href="https://dev.diamondkey.com/browse/OM5K-11303">https://dev.diamondkey.com/browse/OM5K-11303</a></p>
          <p>OM5K-11304 - <a href="https://dev.diamondkey.com/browse/OM5K-11304">https://dev.diamondkey.com/browse/OM5K-11304</a></p>
          <p>OM5K-11318 - <a href="https://dev.diamondkey.com/browse/OM5K-11318">https://dev.diamondkey.com/browse/OM5K-11318</a></p>
          <p>OM5K-10255 - <a href="https://dev.diamondkey.com/browse/OM5K-10255">https://dev.diamondkey.com/browse/OM5K-10255</a></p>
          <p>OM5K-11096 - <a href="https://dev.diamondkey.com/browse/OM5K-11096">https://dev.diamondkey.com/browse/OM5K-11096</a></p>
          <p>OM5K-11098 - <a href="https://dev.diamondkey.com/browse/OM5K-11098">https://dev.diamondkey.com/browse/OM5K-11098</a></p>
          <p>OM5K-11107 - <a href="https://dev.diamondkey.com/browse/OM5K-11107">https://dev.diamondkey.com/browse/OM5K-11107</a></p>
          <p>OM5K-11311 - <a href="https://dev.diamondkey.com/browse/OM5K-11311">https://dev.diamondkey.com/browse/OM5K-11311</a></p>
          <p>OM5K-11265 - <a href="https://dev.diamondkey.com/browse/OM5K-11265">https://dev.diamondkey.com/browse/OM5K-11265</a></p>
          <p>OM5K-11312 - <a href="https://dev.diamondkey.com/browse/OM5K-11312">https://dev.diamondkey.com/browse/OM5K-11312</a></p>
          <p>OM5K-11320 - <a href="https://dev.diamondkey.com/browse/OM5K-11320">https://dev.diamondkey.com/browse/OM5K-11320</a></p>
          <p>OM5K-11321 - <a href="https://dev.diamondkey.com/browse/OM5K-11321">https://dev.diamondkey.com/browse/OM5K-11321</a></p>
          <p>OM5K-11324 - <a href="https://dev.diamondkey.com/browse/OM5K-11324">https://dev.diamondkey.com/browse/OM5K-11324</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.6) - 27/06/2023`,
    content: (
      <>
        <>
          <p>OM5K-10965 - <a href="https://dev.diamondkey.com/browse/OM5K-10965">https://dev.diamondkey.com/browse/OM5K-10965</a></p>
          <p>OM5K-11189 - <a href="https://dev.diamondkey.com/browse/OM5K-11189">https://dev.diamondkey.com/browse/OM5K-11189</a></p>
          <p>OM5K-11258 - <a href="https://dev.diamondkey.com/browse/OM5K-11258">https://dev.diamondkey.com/browse/OM5K-11258</a></p>
          <p>OM5K-11222 - <a href="https://dev.diamondkey.com/browse/OM5K-11222">https://dev.diamondkey.com/browse/OM5K-11222</a></p>
          <p>OM5K-11226 - <a href="https://dev.diamondkey.com/browse/OM5K-11226">https://dev.diamondkey.com/browse/OM5K-11226</a></p>
          <p>OM5K-11262 - <a href="https://dev.diamondkey.com/browse/OM5K-11262">https://dev.diamondkey.com/browse/OM5K-11262</a></p>
          <p>OM5K-11270 - <a href="https://dev.diamondkey.com/browse/OM5K-11270">https://dev.diamondkey.com/browse/OM5K-11270</a></p>
          <p>OM5K-11271 - <a href="https://dev.diamondkey.com/browse/OM5K-11271">https://dev.diamondkey.com/browse/OM5K-11271</a></p>
          <p>OM5K-11272 - <a href="https://dev.diamondkey.com/browse/OM5K-11272">https://dev.diamondkey.com/browse/OM5K-11272</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.5) - 16/06/2023`,
    content: (
      <>
        <>
          <p>OM5K-11190 - <a href="https://dev.diamondkey.com/browse/OM5K-11190">https://dev.diamondkey.com/browse/OM5K-11190</a></p>
          <p>OM5K-11238 - <a href="https://dev.diamondkey.com/browse/OM5K-11238">https://dev.diamondkey.com/browse/OM5K-11238</a></p>
          <p>OM5K-11242 - <a href="https://dev.diamondkey.com/browse/OM5K-11242">https://dev.diamondkey.com/browse/OM5K-11242</a></p>
          <p>OM5K-11257 - <a href="https://dev.diamondkey.com/browse/OM5K-11257">https://dev.diamondkey.com/browse/OM5K-11257</a></p>
          <p>OM5K-11221 - <a href="https://dev.diamondkey.com/browse/OM5K-11221">https://dev.diamondkey.com/browse/OM5K-11221</a></p>
          <p>OM5K-11231 - <a href="https://dev.diamondkey.com/browse/OM5K-11231">https://dev.diamondkey.com/browse/OM5K-11231</a></p>
          <p>OM5K-11232 - <a href="https://dev.diamondkey.com/browse/OM5K-11232">https://dev.diamondkey.com/browse/OM5K-11232</a></p>
          <p>OM5K-11251 - <a href="https://dev.diamondkey.com/browse/OM5K-11251">https://dev.diamondkey.com/browse/OM5K-11251</a></p>
          <p>OM5K-11229 - <a href="https://dev.diamondkey.com/browse/OM5K-11229">https://dev.diamondkey.com/browse/OM5K-11229</a></p>
          <p>OM5K-11240 - <a href="https://dev.diamondkey.com/browse/OM5K-11240">https://dev.diamondkey.com/browse/OM5K-11240</a></p>
          <p>OM5K-11250 - <a href="https://dev.diamondkey.com/browse/OM5K-11250">https://dev.diamondkey.com/browse/OM5K-11250</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.4) - 06/06/2023`,
    content: (
      <>
        <>
          <p>OM5K-11101 - <a href="https://dev.diamondkey.com/browse/OM5K-11101">https://dev.diamondkey.com/browse/OM5K-11101</a></p>
          <p>OM5K-11102 - <a href="https://dev.diamondkey.com/browse/OM5K-11102">https://dev.diamondkey.com/browse/OM5K-11102</a></p>
          <p>OM5K-11181 - <a href="https://dev.diamondkey.com/browse/OM5K-11181">https://dev.diamondkey.com/browse/OM5K-11181</a></p>
          <p>OM5K-11200 - <a href="https://dev.diamondkey.com/browse/OM5K-11200">https://dev.diamondkey.com/browse/OM5K-11200</a></p>
          <p>OM5K-11208 - <a href="https://dev.diamondkey.com/browse/OM5K-11208">https://dev.diamondkey.com/browse/OM5K-11208</a></p>
          <p>OM5K-11212 - <a href="https://dev.diamondkey.com/browse/OM5K-11212">https://dev.diamondkey.com/browse/OM5K-11212</a></p>
          <p>OM5K-11214 - <a href="https://dev.diamondkey.com/browse/OM5K-11214">https://dev.diamondkey.com/browse/OM5K-11214</a></p>
          <p>OM5K-11219 - <a href="https://dev.diamondkey.com/browse/OM5K-11219">https://dev.diamondkey.com/browse/OM5K-11219</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.3) - 17/05/2023`,
    content: (
      <>
        <>
          <p>OM5K-11111 - <a href="https://dev.diamondkey.com/browse/OM5K-11111">https://dev.diamondkey.com/browse/OM5K-11111</a></p>
          <p>OM5K-11112 - <a href="https://dev.diamondkey.com/browse/OM5K-11112">https://dev.diamondkey.com/browse/OM5K-11112</a></p>
          <p>OM5K-11115 - <a href="https://dev.diamondkey.com/browse/OM5K-11115">https://dev.diamondkey.com/browse/OM5K-11115</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.2) - 10/05/2023`,
    content: (
      <>
        <>
          <p>OM5K-11151 - <a href="https://dev.diamondkey.com/browse/OM5K-11151">https://dev.diamondkey.com/browse/OM5K-11151</a></p>
          <p>OM5K-11150 - <a href="https://dev.diamondkey.com/browse/OM5K-11150">https://dev.diamondkey.com/browse/OM5K-11150</a></p>
          <p>OM5K-11157 - <a href="https://dev.diamondkey.com/browse/OM5K-11157">https://dev.diamondkey.com/browse/OM5K-11157</a></p>
          <p>OM5K-11127 - <a href="https://dev.diamondkey.com/browse/OM5K-11127">https://dev.diamondkey.com/browse/OM5K-11127</a></p>
          <p>OM5K-11132 - <a href="https://dev.diamondkey.com/browse/OM5K-11132">https://dev.diamondkey.com/browse/OM5K-11132</a></p>
          <p>OM5K-11149 - <a href="https://dev.diamondkey.com/browse/OM5K-11149">https://dev.diamondkey.com/browse/OM5K-11149</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.8.0-rc.1) - 27/04/2023`,
    content: (
      <>
        <>
          <p>OM5K-11086 - <a href="https://dev.diamondkey.com/browse/OM5K-11086">https://dev.diamondkey.com/browse/OM5K-11086</a></p>
          <p>OM5K-11041 - <a href="https://dev.diamondkey.com/browse/OM5K-11041">https://dev.diamondkey.com/browse/OM5K-11041</a></p>
          <p>OM5K-11044 - <a href="https://dev.diamondkey.com/browse/OM5K-11044">https://dev.diamondkey.com/browse/OM5K-11044</a></p>
          <p>OM5K-11085 - <a href="https://dev.diamondkey.com/browse/OM5K-11085">https://dev.diamondkey.com/browse/OM5K-11085</a></p>
          <p>OM5K-11091 - <a href="https://dev.diamondkey.com/browse/OM5K-11091">https://dev.diamondkey.com/browse/OM5K-11091</a></p>
          <p>OM5K-11092 - <a href="https://dev.diamondkey.com/browse/OM5K-11092">https://dev.diamondkey.com/browse/OM5K-11092</a></p>
          <p>OM5K-11094 - <a href="https://dev.diamondkey.com/browse/OM5K-11094">https://dev.diamondkey.com/browse/OM5K-11094</a></p>
          <p>OM5K-11097 - <a href="https://dev.diamondkey.com/browse/OM5K-11097">https://dev.diamondkey.com/browse/OM5K-11097</a></p>
          <p>OM5K-11076 - <a href="https://dev.diamondkey.com/browse/OM5K-11076">https://dev.diamondkey.com/browse/OM5K-11076</a></p>
          <p>OM5K-11079 - <a href="https://dev.diamondkey.com/browse/OM5K-11079">https://dev.diamondkey.com/browse/OM5K-11079</a></p>
          <p>OM5K-11080 - <a href="https://dev.diamondkey.com/browse/OM5K-11080">https://dev.diamondkey.com/browse/OM5K-11080</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.7.0) - 19/04/2023`,
    content: (
      <>
        <>
          <p>OM5K-10895 - <a href="https://dev.diamondkey.com/browse/OM5K-10895">https://dev.diamondkey.com/browse/OM5K-10895</a></p>
          <p>OM5K-10901 - <a href="https://dev.diamondkey.com/browse/OM5K-10901">https://dev.diamondkey.com/browse/OM5K-10901</a></p>
          <p>OM5K-10912 - <a href="https://dev.diamondkey.com/browse/OM5K-10912">https://dev.diamondkey.com/browse/OM5K-10912</a></p>
          <p>OM5K-10922 - <a href="https://dev.diamondkey.com/browse/OM5K-10922">https://dev.diamondkey.com/browse/OM5K-10922</a></p>
          <p>OM5K-10932 - <a href="https://dev.diamondkey.com/browse/OM5K-10932">https://dev.diamondkey.com/browse/OM5K-10932</a></p>
          <p>OM5K-10934 - <a href="https://dev.diamondkey.com/browse/OM5K-10934">https://dev.diamondkey.com/browse/OM5K-10934</a></p>
          <p>OM5K-10935 - <a href="https://dev.diamondkey.com/browse/OM5K-10935">https://dev.diamondkey.com/browse/OM5K-10935</a></p>
          <p>OM5K-10936 - <a href="https://dev.diamondkey.com/browse/OM5K-10936">https://dev.diamondkey.com/browse/OM5K-10936</a></p>
          <p>OM5K-10938 - <a href="https://dev.diamondkey.com/browse/OM5K-10938">https://dev.diamondkey.com/browse/OM5K-10938</a></p>
          <p>OM5K-10939 - <a href="https://dev.diamondkey.com/browse/OM5K-10939">https://dev.diamondkey.com/browse/OM5K-10939</a></p>
          <p>OM5K-10940 - <a href="https://dev.diamondkey.com/browse/OM5K-10940">https://dev.diamondkey.com/browse/OM5K-10940</a></p>
          <p>OM5K-10941 - <a href="https://dev.diamondkey.com/browse/OM5K-10941">https://dev.diamondkey.com/browse/OM5K-10941</a></p>
          <p>OM5K-10942 - <a href="https://dev.diamondkey.com/browse/OM5K-10942">https://dev.diamondkey.com/browse/OM5K-10942</a></p>
          <p>OM5K-10979 - <a href="https://dev.diamondkey.com/browse/OM5K-10979">https://dev.diamondkey.com/browse/OM5K-10979</a></p>
          <p>OM5K-11001 - <a href="https://dev.diamondkey.com/browse/OM5K-11001">https://dev.diamondkey.com/browse/OM5K-11001</a></p>
          <p>OM5K-11002 - <a href="https://dev.diamondkey.com/browse/OM5K-11002">https://dev.diamondkey.com/browse/OM5K-11002</a></p>
          <p>OM5K-11029 - <a href="https://dev.diamondkey.com/browse/OM5K-11029">https://dev.diamondkey.com/browse/OM5K-11029</a></p>
          <p>OM5K-11031 - <a href="https://dev.diamondkey.com/browse/OM5K-11031">https://dev.diamondkey.com/browse/OM5K-11031</a></p>
          <p>OM5K-11071 - <a href="https://dev.diamondkey.com/browse/OM5K-11071">https://dev.diamondkey.com/browse/OM5K-11071</a></p>
          <p>OM5K-11072 - <a href="https://dev.diamondkey.com/browse/OM5K-11072">https://dev.diamondkey.com/browse/OM5K-11072</a></p>
          <p>OM5K-9935 - <a href="https://dev.diamondkey.com/browse/OM5K-9935">https://dev.diamondkey.com/browse/OM5K-9935</a></p>
          <p>OM5K-10836 - <a href="https://dev.diamondkey.com/browse/OM5K-10836">https://dev.diamondkey.com/browse/OM5K-10836</a></p>
          <p>OM5K-10879 - <a href="https://dev.diamondkey.com/browse/OM5K-10879">https://dev.diamondkey.com/browse/OM5K-10879</a></p>
          <p>OM5K-10890 - <a href="https://dev.diamondkey.com/browse/OM5K-10890">https://dev.diamondkey.com/browse/OM5K-10890</a></p>
          <p>OM5K-10903 - <a href="https://dev.diamondkey.com/browse/OM5K-10903">https://dev.diamondkey.com/browse/OM5K-10903</a></p>
          <p>OM5K-10906 - <a href="https://dev.diamondkey.com/browse/OM5K-10906">https://dev.diamondkey.com/browse/OM5K-10906</a></p>
          <p>OM5K-10907 - <a href="https://dev.diamondkey.com/browse/OM5K-10907">https://dev.diamondkey.com/browse/OM5K-10907</a></p>
          <p>OM5K-10911 - <a href="https://dev.diamondkey.com/browse/OM5K-10911">https://dev.diamondkey.com/browse/OM5K-10911</a></p>
          <p>OM5K-10914 - <a href="https://dev.diamondkey.com/browse/OM5K-10914">https://dev.diamondkey.com/browse/OM5K-10914</a></p>
          <p>OM5K-10915 - <a href="https://dev.diamondkey.com/browse/OM5K-10915">https://dev.diamondkey.com/browse/OM5K-10915</a></p>
          <p>OM5K-10977 - <a href="https://dev.diamondkey.com/browse/OM5K-10977">https://dev.diamondkey.com/browse/OM5K-10977</a></p>
          <p>OM5K-10984 - <a href="https://dev.diamondkey.com/browse/OM5K-10984">https://dev.diamondkey.com/browse/OM5K-10984</a></p>
          <p>OM5K-10987 - <a href="https://dev.diamondkey.com/browse/OM5K-10987">https://dev.diamondkey.com/browse/OM5K-10987</a></p>
          <p>OM5K-11024 - <a href="https://dev.diamondkey.com/browse/OM5K-11024">https://dev.diamondkey.com/browse/OM5K-11024</a></p>
          <p>OM5K-11025 - <a href="https://dev.diamondkey.com/browse/OM5K-11025">https://dev.diamondkey.com/browse/OM5K-11025</a></p>
          <p>OM5K-11035 - <a href="https://dev.diamondkey.com/browse/OM5K-11035">https://dev.diamondkey.com/browse/OM5K-11035</a></p>
          <p>OM5K-11039 - <a href="https://dev.diamondkey.com/browse/OM5K-11039">https://dev.diamondkey.com/browse/OM5K-11039</a></p>
          <p>OM5K-11048 - <a href="https://dev.diamondkey.com/browse/OM5K-11048">https://dev.diamondkey.com/browse/OM5K-11048</a></p>
          <p>OM5K-11052 - <a href="https://dev.diamondkey.com/browse/OM5K-11052">https://dev.diamondkey.com/browse/OM5K-11052</a></p>
          <p>OM5K-10886 - <a href="https://dev.diamondkey.com/browse/OM5K-10886">https://dev.diamondkey.com/browse/OM5K-10886</a></p>
          <p>OM5K-10896 - <a href="https://dev.diamondkey.com/browse/OM5K-10896">https://dev.diamondkey.com/browse/OM5K-10896</a></p>
          <p>OM5K-10908 - <a href="https://dev.diamondkey.com/browse/OM5K-10908">https://dev.diamondkey.com/browse/OM5K-10908</a></p>
          <p>OM5K-10909 - <a href="https://dev.diamondkey.com/browse/OM5K-10909">https://dev.diamondkey.com/browse/OM5K-10909</a></p>
          <p>OM5K-10960 - <a href="https://dev.diamondkey.com/browse/OM5K-10960">https://dev.diamondkey.com/browse/OM5K-10960</a></p>
          <p>OM5K-10962 - <a href="https://dev.diamondkey.com/browse/OM5K-10962">https://dev.diamondkey.com/browse/OM5K-10962</a></p>
          <p>OM5K-10963 - <a href="https://dev.diamondkey.com/browse/OM5K-10963">https://dev.diamondkey.com/browse/OM5K-10963</a></p>
          <p>OM5K-10982 - <a href="https://dev.diamondkey.com/browse/OM5K-10982">https://dev.diamondkey.com/browse/OM5K-10982</a></p>
          <p>OM5K-10983 - <a href="https://dev.diamondkey.com/browse/OM5K-10983">https://dev.diamondkey.com/browse/OM5K-10983</a></p>
          <p>OM5K-10989 - <a href="https://dev.diamondkey.com/browse/OM5K-10989">https://dev.diamondkey.com/browse/OM5K-10989</a></p>
          <p>OM5K-10995 - <a href="https://dev.diamondkey.com/browse/OM5K-10995">https://dev.diamondkey.com/browse/OM5K-10995</a></p>
          <p>OM5K-10999 - <a href="https://dev.diamondkey.com/browse/OM5K-10999">https://dev.diamondkey.com/browse/OM5K-10999</a></p>
          <p>OM5K-11004 - <a href="https://dev.diamondkey.com/browse/OM5K-11004">https://dev.diamondkey.com/browse/OM5K-11004</a></p>
          <p>OM5K-11007 - <a href="https://dev.diamondkey.com/browse/OM5K-11007">https://dev.diamondkey.com/browse/OM5K-11007</a></p>
          <p>OM5K-11008 - <a href="https://dev.diamondkey.com/browse/OM5K-11008">https://dev.diamondkey.com/browse/OM5K-11008</a></p>
          <p>OM5K-11013 - <a href="https://dev.diamondkey.com/browse/OM5K-11013">https://dev.diamondkey.com/browse/OM5K-11013</a></p>
          <p>OM5K-11022 - <a href="https://dev.diamondkey.com/browse/OM5K-11022">https://dev.diamondkey.com/browse/OM5K-11022</a></p>
          <p>OM5K-11023 - <a href="https://dev.diamondkey.com/browse/OM5K-11023">https://dev.diamondkey.com/browse/OM5K-11023</a></p>
          <p>OM5K-11034 - <a href="https://dev.diamondkey.com/browse/OM5K-11034">https://dev.diamondkey.com/browse/OM5K-11034</a></p>
          <p>OM5K-11036 - <a href="https://dev.diamondkey.com/browse/OM5K-11036">https://dev.diamondkey.com/browse/OM5K-11036</a></p>
          <p>OM5K-11037 - <a href="https://dev.diamondkey.com/browse/OM5K-11037">https://dev.diamondkey.com/browse/OM5K-11037</a></p>
          <p>OM5K-11043 - <a href="https://dev.diamondkey.com/browse/OM5K-11043">https://dev.diamondkey.com/browse/OM5K-11043</a></p>
          <p>OM5K-11046 - <a href="https://dev.diamondkey.com/browse/OM5K-11046">https://dev.diamondkey.com/browse/OM5K-11046</a></p>
          <p>OM5K-11049 - <a href="https://dev.diamondkey.com/browse/OM5K-11049">https://dev.diamondkey.com/browse/OM5K-11049</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.6.0-rc.2) - 22/02/2023`,
    content: (
      <>
        <>
          <p>OM5K-10826 - <a href="https://dev.diamondkey.com/browse/OM5K-10826">https://dev.diamondkey.com/browse/OM5K-10826</a></p>
          <p>OM5K-10834 - <a href="https://dev.diamondkey.com/browse/OM5K-10834">https://dev.diamondkey.com/browse/OM5K-10834</a></p>
          <p>OM5K-10887 - <a href="https://dev.diamondkey.com/browse/OM5K-10887">https://dev.diamondkey.com/browse/OM5K-10887</a></p>
          <p>OM5K-10898 - <a href="https://dev.diamondkey.com/browse/OM5K-10898">https://dev.diamondkey.com/browse/OM5K-10898</a></p>
          <p>OM5K-10913 - <a href="https://dev.diamondkey.com/browse/OM5K-10913">https://dev.diamondkey.com/browse/OM5K-10913</a></p>
          <p>OM5K-10845 - <a href="https://dev.diamondkey.com/browse/OM5K-10845">https://dev.diamondkey.com/browse/OM5K-10845</a></p>
          <p>OM5K-10854 - <a href="https://dev.diamondkey.com/browse/OM5K-10854">https://dev.diamondkey.com/browse/OM5K-10854</a></p>
          <p>OM5K-10856 - <a href="https://dev.diamondkey.com/browse/OM5K-10856">https://dev.diamondkey.com/browse/OM5K-10856</a></p>
          <p>OM5K-10871 - <a href="https://dev.diamondkey.com/browse/OM5K-10871">https://dev.diamondkey.com/browse/OM5K-10871</a></p>
          <p>OM5K-10885 - <a href="https://dev.diamondkey.com/browse/OM5K-10885">https://dev.diamondkey.com/browse/OM5K-10885</a></p>
          <p>OM5K-10888 - <a href="https://dev.diamondkey.com/browse/OM5K-10888">https://dev.diamondkey.com/browse/OM5K-10888</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.6.0-rc.1) - 23/01/2023`,
    content: (
      <>
        <>
          <p>OM5K-10629 - <a href="https://dev.diamondkey.com/browse/OM5K-10629">https://dev.diamondkey.com/browse/OM5K-10629</a></p>
          <p>OM5K-10630 - <a href="https://dev.diamondkey.com/browse/OM5K-10630">https://dev.diamondkey.com/browse/OM5K-10630</a></p>
          <p>OM5K-10668 - <a href="https://dev.diamondkey.com/browse/OM5K-10668">https://dev.diamondkey.com/browse/OM5K-10668</a></p>
          <p>OM5K-10738 - <a href="https://dev.diamondkey.com/browse/OM5K-10738">https://dev.diamondkey.com/browse/OM5K-10738</a></p>
          <p>OM5K-10754 - <a href="https://dev.diamondkey.com/browse/OM5K-10754">https://dev.diamondkey.com/browse/OM5K-10754</a></p>
          <p>OM5K-10820 - <a href="https://dev.diamondkey.com/browse/OM5K-10820">https://dev.diamondkey.com/browse/OM5K-10820</a></p>
          <p>OM5K-10821 - <a href="https://dev.diamondkey.com/browse/OM5K-10821">https://dev.diamondkey.com/browse/OM5K-10821</a></p>
          <p>OM5K-10832 - <a href="https://dev.diamondkey.com/browse/OM5K-10832">https://dev.diamondkey.com/browse/OM5K-10832</a></p>
          <p>OM5K-10833 - <a href="https://dev.diamondkey.com/browse/OM5K-10833">https://dev.diamondkey.com/browse/OM5K-10833</a></p>
          <p>OM5K-10463 - <a href="https://dev.diamondkey.com/browse/OM5K-10463">https://dev.diamondkey.com/browse/OM5K-10463</a></p>
          <p>OM5K-10623 - <a href="https://dev.diamondkey.com/browse/OM5K-10623">https://dev.diamondkey.com/browse/OM5K-10623</a></p>
          <p>OM5K-10752 - <a href="https://dev.diamondkey.com/browse/OM5K-10752">https://dev.diamondkey.com/browse/OM5K-10752</a></p>
          <p>OM5K-10784 - <a href="https://dev.diamondkey.com/browse/OM5K-10784">https://dev.diamondkey.com/browse/OM5K-10784</a></p>
          <p>OM5K-10799 - <a href="https://dev.diamondkey.com/browse/OM5K-10799">https://dev.diamondkey.com/browse/OM5K-10799</a></p>
          <p>OM5K-10801 - <a href="https://dev.diamondkey.com/browse/OM5K-10801">https://dev.diamondkey.com/browse/OM5K-10801</a></p>
          <p>OM5K-10803 - <a href="https://dev.diamondkey.com/browse/OM5K-10803">https://dev.diamondkey.com/browse/OM5K-10803</a></p>
          <p>OM5K-10816 - <a href="https://dev.diamondkey.com/browse/OM5K-10816">https://dev.diamondkey.com/browse/OM5K-10816</a></p>
          <p>OM5K-10825 - <a href="https://dev.diamondkey.com/browse/OM5K-10825">https://dev.diamondkey.com/browse/OM5K-10825</a></p>
          <p>OM5K-10827 - <a href="https://dev.diamondkey.com/browse/OM5K-10827">https://dev.diamondkey.com/browse/OM5K-10827</a></p>
          <p>OM5K-10828 - <a href="https://dev.diamondkey.com/browse/OM5K-10828">https://dev.diamondkey.com/browse/OM5K-10828</a></p>
          <p>OM5K-10830 - <a href="https://dev.diamondkey.com/browse/OM5K-10830">https://dev.diamondkey.com/browse/OM5K-10830</a></p>
          <p>OM5K-10831 - <a href="https://dev.diamondkey.com/browse/OM5K-10831">https://dev.diamondkey.com/browse/OM5K-10831</a></p>
          <p>OM5K-10843 - <a href="https://dev.diamondkey.com/browse/OM5K-10843">https://dev.diamondkey.com/browse/OM5K-10843</a></p>
          <p>OM5K-10844 - <a href="https://dev.diamondkey.com/browse/OM5K-10844">https://dev.diamondkey.com/browse/OM5K-10844</a></p>
          <p>OM5K-10845 - <a href="https://dev.diamondkey.com/browse/OM5K-10845">https://dev.diamondkey.com/browse/OM5K-10845</a></p>
          <p>OM5K-9996 - <a href="https://dev.diamondkey.com/browse/OM5K-9996">https://dev.diamondkey.com/browse/OM5K-9996</a></p>
          <p>OM5K-10802 - <a href="https://dev.diamondkey.com/browse/OM5K-10802">https://dev.diamondkey.com/browse/OM5K-10802</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.5.0) - 25/11/2022`,
    content: (
      <>
        <>
          <p>OM5K-10674 - <a href="https://dev.diamondkey.com/browse/OM5K-10674">https://dev.diamondkey.com/browse/OM5K-10674</a></p>
          <p>OM5K-10676 - <a href="https://dev.diamondkey.com/browse/OM5K-10676">https://dev.diamondkey.com/browse/OM5K-10676</a></p>
          <p>OM5K-10677 - <a href="https://dev.diamondkey.com/browse/OM5K-10677">https://dev.diamondkey.com/browse/OM5K-10677</a></p>
          <p>OM5K-8204 - <a href="https://dev.diamondkey.com/browse/OM5K-8204">https://dev.diamondkey.com/browse/OM5K-8204</a></p>
          <p>OM5K-10019 - <a href="https://dev.diamondkey.com/browse/OM5K-10019">https://dev.diamondkey.com/browse/OM5K-10019</a></p>
          <p>OM5K-10020 - <a href="https://dev.diamondkey.com/browse/OM5K-10020">https://dev.diamondkey.com/browse/OM5K-10020</a></p>
          <p>OM5K-10022 - <a href="https://dev.diamondkey.com/browse/OM5K-10022">https://dev.diamondkey.com/browse/OM5K-10022</a></p>
          <p>OM5K-10045 - <a href="https://dev.diamondkey.com/browse/OM5K-10045">https://dev.diamondkey.com/browse/OM5K-10045</a></p>
          <p>OM5K-10076 - <a href="https://dev.diamondkey.com/browse/OM5K-10076">https://dev.diamondkey.com/browse/OM5K-10076</a></p>
          <p>OM5K-10080 - <a href="https://dev.diamondkey.com/browse/OM5K-10080">https://dev.diamondkey.com/browse/OM5K-10080</a></p>
          <p>OM5K-10115 - <a href="https://dev.diamondkey.com/browse/OM5K-10115">https://dev.diamondkey.com/browse/OM5K-10115</a></p>
          <p>OM5K-10137 - <a href="https://dev.diamondkey.com/browse/OM5K-10137">https://dev.diamondkey.com/browse/OM5K-10137</a></p>
          <p>OM5K-10161 - <a href="https://dev.diamondkey.com/browse/OM5K-10161">https://dev.diamondkey.com/browse/OM5K-10161</a></p>
          <p>OM5K-10162 - <a href="https://dev.diamondkey.com/browse/OM5K-10162">https://dev.diamondkey.com/browse/OM5K-10162</a></p>
          <p>OM5K-10163 - <a href="https://dev.diamondkey.com/browse/OM5K-10163">https://dev.diamondkey.com/browse/OM5K-10163</a></p>
          <p>OM5K-10164 - <a href="https://dev.diamondkey.com/browse/OM5K-10164">https://dev.diamondkey.com/browse/OM5K-10164</a></p>
          <p>OM5K-10165 - <a href="https://dev.diamondkey.com/browse/OM5K-10165">https://dev.diamondkey.com/browse/OM5K-10165</a></p>
          <p>OM5K-10166 - <a href="https://dev.diamondkey.com/browse/OM5K-10166">https://dev.diamondkey.com/browse/OM5K-10166</a></p>
          <p>OM5K-10167 - <a href="https://dev.diamondkey.com/browse/OM5K-10167">https://dev.diamondkey.com/browse/OM5K-10167</a></p>
          <p>OM5K-10221 - <a href="https://dev.diamondkey.com/browse/OM5K-10221">https://dev.diamondkey.com/browse/OM5K-10221</a></p>
          <p>OM5K-10222 - <a href="https://dev.diamondkey.com/browse/OM5K-10222">https://dev.diamondkey.com/browse/OM5K-10222</a></p>
          <p>OM5K-10225 - <a href="https://dev.diamondkey.com/browse/OM5K-10225">https://dev.diamondkey.com/browse/OM5K-10225</a></p>
          <p>OM5K-10257 - <a href="https://dev.diamondkey.com/browse/OM5K-10257">https://dev.diamondkey.com/browse/OM5K-10257</a></p>
          <p>OM5K-10258 - <a href="https://dev.diamondkey.com/browse/OM5K-10258">https://dev.diamondkey.com/browse/OM5K-10258</a></p>
          <p>OM5K-10259 - <a href="https://dev.diamondkey.com/browse/OM5K-10259">https://dev.diamondkey.com/browse/OM5K-10259</a></p>
          <p>OM5K-10265 - <a href="https://dev.diamondkey.com/browse/OM5K-10265">https://dev.diamondkey.com/browse/OM5K-10265</a></p>
          <p>OM5K-10266 - <a href="https://dev.diamondkey.com/browse/OM5K-10266">https://dev.diamondkey.com/browse/OM5K-10266</a></p>
          <p>OM5K-10272 - <a href="https://dev.diamondkey.com/browse/OM5K-10272">https://dev.diamondkey.com/browse/OM5K-10272</a></p>
          <p>OM5K-10273 - <a href="https://dev.diamondkey.com/browse/OM5K-10273">https://dev.diamondkey.com/browse/OM5K-10273</a></p>
          <p>OM5K-10274 - <a href="https://dev.diamondkey.com/browse/OM5K-10274">https://dev.diamondkey.com/browse/OM5K-10274</a></p>
          <p>OM5K-10275 - <a href="https://dev.diamondkey.com/browse/OM5K-10275">https://dev.diamondkey.com/browse/OM5K-10275</a></p>
          <p>OM5K-10276 - <a href="https://dev.diamondkey.com/browse/OM5K-10276">https://dev.diamondkey.com/browse/OM5K-10276</a></p>
          <p>OM5K-10277 - <a href="https://dev.diamondkey.com/browse/OM5K-10277">https://dev.diamondkey.com/browse/OM5K-10277</a></p>
          <p>OM5K-10281 - <a href="https://dev.diamondkey.com/browse/OM5K-10281">https://dev.diamondkey.com/browse/OM5K-10281</a></p>
          <p>OM5K-10285 - <a href="https://dev.diamondkey.com/browse/OM5K-10285">https://dev.diamondkey.com/browse/OM5K-10285</a></p>
          <p>OM5K-10286 - <a href="https://dev.diamondkey.com/browse/OM5K-10286">https://dev.diamondkey.com/browse/OM5K-10286</a></p>
          <p>OM5K-10292 - <a href="https://dev.diamondkey.com/browse/OM5K-10292">https://dev.diamondkey.com/browse/OM5K-10292</a></p>
          <p>OM5K-10296 - <a href="https://dev.diamondkey.com/browse/OM5K-10296">https://dev.diamondkey.com/browse/OM5K-10296</a></p>
          <p>OM5K-10308 - <a href="https://dev.diamondkey.com/browse/OM5K-10308">https://dev.diamondkey.com/browse/OM5K-10308</a></p>
          <p>OM5K-10319 - <a href="https://dev.diamondkey.com/browse/OM5K-10319">https://dev.diamondkey.com/browse/OM5K-10319</a></p>
          <p>OM5K-10327 - <a href="https://dev.diamondkey.com/browse/OM5K-10327">https://dev.diamondkey.com/browse/OM5K-10327</a></p>
          <p>OM5K-10328 - <a href="https://dev.diamondkey.com/browse/OM5K-10328">https://dev.diamondkey.com/browse/OM5K-10328</a></p>
          <p>OM5K-10331 - <a href="https://dev.diamondkey.com/browse/OM5K-10331">https://dev.diamondkey.com/browse/OM5K-10331</a></p>
          <p>OM5K-10351 - <a href="https://dev.diamondkey.com/browse/OM5K-10351">https://dev.diamondkey.com/browse/OM5K-10351</a></p>
          <p>OM5K-10385 - <a href="https://dev.diamondkey.com/browse/OM5K-10385">https://dev.diamondkey.com/browse/OM5K-10385</a></p>
          <p>OM5K-10386 - <a href="https://dev.diamondkey.com/browse/OM5K-10386">https://dev.diamondkey.com/browse/OM5K-10386</a></p>
          <p>OM5K-10390 - <a href="https://dev.diamondkey.com/browse/OM5K-10390">https://dev.diamondkey.com/browse/OM5K-10390</a></p>
          <p>OM5K-10410 - <a href="https://dev.diamondkey.com/browse/OM5K-10410">https://dev.diamondkey.com/browse/OM5K-10410</a></p>
          <p>OM5K-10419 - <a href="https://dev.diamondkey.com/browse/OM5K-10419">https://dev.diamondkey.com/browse/OM5K-10419</a></p>
          <p>OM5K-10426 - <a href="https://dev.diamondkey.com/browse/OM5K-10426">https://dev.diamondkey.com/browse/OM5K-10426</a></p>
          <p>OM5K-10427 - <a href="https://dev.diamondkey.com/browse/OM5K-10427">https://dev.diamondkey.com/browse/OM5K-10427</a></p>
          <p>OM5K-10428 - <a href="https://dev.diamondkey.com/browse/OM5K-10428">https://dev.diamondkey.com/browse/OM5K-10428</a></p>
          <p>OM5K-10429 - <a href="https://dev.diamondkey.com/browse/OM5K-10429">https://dev.diamondkey.com/browse/OM5K-10429</a></p>
          <p>OM5K-10430 - <a href="https://dev.diamondkey.com/browse/OM5K-10430">https://dev.diamondkey.com/browse/OM5K-10430</a></p>
          <p>OM5K-10460 - <a href="https://dev.diamondkey.com/browse/OM5K-10460">https://dev.diamondkey.com/browse/OM5K-10460</a></p>
          <p>OM5K-10461 - <a href="https://dev.diamondkey.com/browse/OM5K-10461">https://dev.diamondkey.com/browse/OM5K-10461</a></p>
          <p>OM5K-10489 - <a href="https://dev.diamondkey.com/browse/OM5K-10489">https://dev.diamondkey.com/browse/OM5K-10489</a></p>
          <p>OM5K-10491 - <a href="https://dev.diamondkey.com/browse/OM5K-10491">https://dev.diamondkey.com/browse/OM5K-10491</a></p>
          <p>OM5K-10492 - <a href="https://dev.diamondkey.com/browse/OM5K-10492">https://dev.diamondkey.com/browse/OM5K-10492</a></p>
          <p>OM5K-10505 - <a href="https://dev.diamondkey.com/browse/OM5K-10505">https://dev.diamondkey.com/browse/OM5K-10505</a></p>
          <p>OM5K-10506 - <a href="https://dev.diamondkey.com/browse/OM5K-10506">https://dev.diamondkey.com/browse/OM5K-10506</a></p>
          <p>OM5K-10507 - <a href="https://dev.diamondkey.com/browse/OM5K-10507">https://dev.diamondkey.com/browse/OM5K-10507</a></p>
          <p>OM5K-10508 - <a href="https://dev.diamondkey.com/browse/OM5K-10508">https://dev.diamondkey.com/browse/OM5K-10508</a></p>
          <p>OM5K-10509 - <a href="https://dev.diamondkey.com/browse/OM5K-10509">https://dev.diamondkey.com/browse/OM5K-10509</a></p>
          <p>OM5K-10518 - <a href="https://dev.diamondkey.com/browse/OM5K-10518">https://dev.diamondkey.com/browse/OM5K-10518</a></p>
          <p>OM5K-10536 - <a href="https://dev.diamondkey.com/browse/OM5K-10536">https://dev.diamondkey.com/browse/OM5K-10536</a></p>
          <p>OM5K-10541 - <a href="https://dev.diamondkey.com/browse/OM5K-10541">https://dev.diamondkey.com/browse/OM5K-10541</a></p>
          <p>OM5K-10544 - <a href="https://dev.diamondkey.com/browse/OM5K-10544">https://dev.diamondkey.com/browse/OM5K-10544</a></p>
          <p>OM5K-10554 - <a href="https://dev.diamondkey.com/browse/OM5K-10554">https://dev.diamondkey.com/browse/OM5K-10554</a></p>
          <p>OM5K-10573 - <a href="https://dev.diamondkey.com/browse/OM5K-10573">https://dev.diamondkey.com/browse/OM5K-10573</a></p>
          <p>OM5K-10584 - <a href="https://dev.diamondkey.com/browse/OM5K-10584">https://dev.diamondkey.com/browse/OM5K-10584</a></p>
          <p>OM5K-10589 - <a href="https://dev.diamondkey.com/browse/OM5K-10589">https://dev.diamondkey.com/browse/OM5K-10589</a></p>
          <p>OM5K-10593 - <a href="https://dev.diamondkey.com/browse/OM5K-10593">https://dev.diamondkey.com/browse/OM5K-10593</a></p>
          <p>OM5K-10594 - <a href="https://dev.diamondkey.com/browse/OM5K-10594">https://dev.diamondkey.com/browse/OM5K-10594</a></p>
          <p>OM5K-10595 - <a href="https://dev.diamondkey.com/browse/OM5K-10595">https://dev.diamondkey.com/browse/OM5K-10595</a></p>
          <p>OM5K-10598 - <a href="https://dev.diamondkey.com/browse/OM5K-10598">https://dev.diamondkey.com/browse/OM5K-10598</a></p>
          <p>OM5K-10601 - <a href="https://dev.diamondkey.com/browse/OM5K-10601">https://dev.diamondkey.com/browse/OM5K-10601</a></p>
          <p>OM5K-10614 - <a href="https://dev.diamondkey.com/browse/OM5K-10614">https://dev.diamondkey.com/browse/OM5K-10614</a></p>
          <p>OM5K-10636 - <a href="https://dev.diamondkey.com/browse/OM5K-10636">https://dev.diamondkey.com/browse/OM5K-10636</a></p>
          <p>OM5K-10637 - <a href="https://dev.diamondkey.com/browse/OM5K-10637">https://dev.diamondkey.com/browse/OM5K-10637</a></p>
          <p>OM5K-10647 - <a href="https://dev.diamondkey.com/browse/OM5K-10647">https://dev.diamondkey.com/browse/OM5K-10647</a></p>
          <p>OM5K-10662 - <a href="https://dev.diamondkey.com/browse/OM5K-10662">https://dev.diamondkey.com/browse/OM5K-10662</a></p>
          <p>OM5K-10711 - <a href="https://dev.diamondkey.com/browse/OM5K-10711">https://dev.diamondkey.com/browse/OM5K-10711</a></p>
          <p>OM5K-10712 - <a href="https://dev.diamondkey.com/browse/OM5K-10712">https://dev.diamondkey.com/browse/OM5K-10712</a></p>
          <p>OM5K-10716 - <a href="https://dev.diamondkey.com/browse/OM5K-10716">https://dev.diamondkey.com/browse/OM5K-10716</a></p>
          <p>OM5K-10727 - <a href="https://dev.diamondkey.com/browse/OM5K-10727">https://dev.diamondkey.com/browse/OM5K-10727</a></p>
          <p>OM5K-10728 - <a href="https://dev.diamondkey.com/browse/OM5K-10728">https://dev.diamondkey.com/browse/OM5K-10728</a></p>
          <p>OM5K-7050 - <a href="https://dev.diamondkey.com/browse/OM5K-7050">https://dev.diamondkey.com/browse/OM5K-7050</a></p>
          <p>OM5K-9920 - <a href="https://dev.diamondkey.com/browse/OM5K-9920">https://dev.diamondkey.com/browse/OM5K-9920</a></p>
          <p>OM5K-9958 - <a href="https://dev.diamondkey.com/browse/OM5K-9958">https://dev.diamondkey.com/browse/OM5K-9958</a></p>
          <p>OM5K-9960 - <a href="https://dev.diamondkey.com/browse/OM5K-9960">https://dev.diamondkey.com/browse/OM5K-9960</a></p>
          <p>OM5K-9983 - <a href="https://dev.diamondkey.com/browse/OM5K-9983">https://dev.diamondkey.com/browse/OM5K-9983</a></p>
          <p>OM5K-10049 - <a href="https://dev.diamondkey.com/browse/OM5K-10049">https://dev.diamondkey.com/browse/OM5K-10049</a></p>
          <p>OM5K-10068 - <a href="https://dev.diamondkey.com/browse/OM5K-10068">https://dev.diamondkey.com/browse/OM5K-10068</a></p>
          <p>OM5K-10128 - <a href="https://dev.diamondkey.com/browse/OM5K-10128">https://dev.diamondkey.com/browse/OM5K-10128</a></p>
          <p>OM5K-10288 - <a href="https://dev.diamondkey.com/browse/OM5K-10288">https://dev.diamondkey.com/browse/OM5K-10288</a></p>
          <p>OM5K-10291 - <a href="https://dev.diamondkey.com/browse/OM5K-10291">https://dev.diamondkey.com/browse/OM5K-10291</a></p>
          <p>OM5K-10297 - <a href="https://dev.diamondkey.com/browse/OM5K-10297">https://dev.diamondkey.com/browse/OM5K-10297</a></p>
          <p>OM5K-10330 - <a href="https://dev.diamondkey.com/browse/OM5K-10330">https://dev.diamondkey.com/browse/OM5K-10330</a></p>
          <p>OM5K-10347 - <a href="https://dev.diamondkey.com/browse/OM5K-10347">https://dev.diamondkey.com/browse/OM5K-10347</a></p>
          <p>OM5K-10384 - <a href="https://dev.diamondkey.com/browse/OM5K-10384">https://dev.diamondkey.com/browse/OM5K-10384</a></p>
          <p>OM5K-10418 - <a href="https://dev.diamondkey.com/browse/OM5K-10418">https://dev.diamondkey.com/browse/OM5K-10418</a></p>
          <p>OM5K-10457 - <a href="https://dev.diamondkey.com/browse/OM5K-10457">https://dev.diamondkey.com/browse/OM5K-10457</a></p>
          <p>OM5K-10464 - <a href="https://dev.diamondkey.com/browse/OM5K-10464">https://dev.diamondkey.com/browse/OM5K-10464</a></p>
          <p>OM5K-10502 - <a href="https://dev.diamondkey.com/browse/OM5K-10502">https://dev.diamondkey.com/browse/OM5K-10502</a></p>
          <p>OM5K-10528 - <a href="https://dev.diamondkey.com/browse/OM5K-10528">https://dev.diamondkey.com/browse/OM5K-10528</a></p>
          <p>OM5K-10552 - <a href="https://dev.diamondkey.com/browse/OM5K-10552">https://dev.diamondkey.com/browse/OM5K-10552</a></p>
          <p>OM5K-10596 - <a href="https://dev.diamondkey.com/browse/OM5K-10596">https://dev.diamondkey.com/browse/OM5K-10596</a></p>
          <p>OM5K-10603 - <a href="https://dev.diamondkey.com/browse/OM5K-10603">https://dev.diamondkey.com/browse/OM5K-10603</a></p>
          <p>OM5K-10604 - <a href="https://dev.diamondkey.com/browse/OM5K-10604">https://dev.diamondkey.com/browse/OM5K-10604</a></p>
          <p>OM5K-10616 - <a href="https://dev.diamondkey.com/browse/OM5K-10616">https://dev.diamondkey.com/browse/OM5K-10616</a></p>
          <p>OM5K-10652 - <a href="https://dev.diamondkey.com/browse/OM5K-10652">https://dev.diamondkey.com/browse/OM5K-10652</a></p>
          <p>OM5K-10653 - <a href="https://dev.diamondkey.com/browse/OM5K-10653">https://dev.diamondkey.com/browse/OM5K-10653</a></p>
          <p>OM5K-10654 - <a href="https://dev.diamondkey.com/browse/OM5K-10654">https://dev.diamondkey.com/browse/OM5K-10654</a></p>
          <p>OM5K-10680 - <a href="https://dev.diamondkey.com/browse/OM5K-10680">https://dev.diamondkey.com/browse/OM5K-10680</a></p>
          <p>OM5K-10704 - <a href="https://dev.diamondkey.com/browse/OM5K-10704">https://dev.diamondkey.com/browse/OM5K-10704</a></p>
          <p>OM5K-10731 - <a href="https://dev.diamondkey.com/browse/OM5K-10731">https://dev.diamondkey.com/browse/OM5K-10731</a></p>
          <p>OM5K-10746 - <a href="https://dev.diamondkey.com/browse/OM5K-10746">https://dev.diamondkey.com/browse/OM5K-10746</a></p>
          <p>OM5K-10749 - <a href="https://dev.diamondkey.com/browse/OM5K-10749">https://dev.diamondkey.com/browse/OM5K-10749</a></p>
          <p>OM5K-8226 - <a href="https://dev.diamondkey.com/browse/OM5K-8226">https://dev.diamondkey.com/browse/OM5K-8226</a></p>
          <p>OM5K-10329 - <a href="https://dev.diamondkey.com/browse/OM5K-10329">https://dev.diamondkey.com/browse/OM5K-10329</a></p>
          <p>OM5K-10575 - <a href="https://dev.diamondkey.com/browse/OM5K-10575">https://dev.diamondkey.com/browse/OM5K-10575</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.4.1a) - 19/10/2022`,
    content: (
      <>
        <>
          <p>OM5K-10676 - <a href="https://dev.diamondkey.com/browse/OM5K-10676">https://dev.diamondkey.com/browse/OM5K-10676</a></p>
          <p>OM5K-10677 - <a href="https://dev.diamondkey.com/browse/OM5K-10677">https://dev.diamondkey.com/browse/OM5K-10677</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.4.1) - 14/10/2022`,
    content: (
      <>
        <>
          <p>OM5K-10662 - <a href="https://dev.diamondkey.com/browse/OM5K-10662">https://dev.diamondkey.com/browse/OM5K-10662</a></p>
          <p>OM5K-10654 - <a href="https://dev.diamondkey.com/browse/OM5K-10654">https://dev.diamondkey.com/browse/OM5K-10654</a></p>
          <p>OM5K-10653 - <a href="https://dev.diamondkey.com/browse/OM5K-10653">https://dev.diamondkey.com/browse/OM5K-10653</a></p>
          <p>OM5K-10652 - <a href="https://dev.diamondkey.com/browse/OM5K-10652">https://dev.diamondkey.com/browse/OM5K-10652</a></p>
          <p>OM5K-10647 - <a href="https://dev.diamondkey.com/browse/OM5K-10647">https://dev.diamondkey.com/browse/OM5K-10647</a></p>
          <p>OM5K-10636 - <a href="https://dev.diamondkey.com/browse/OM5K-10636">https://dev.diamondkey.com/browse/OM5K-10636</a></p>
          <p>OM5K-10457 - <a href="https://dev.diamondkey.com/browse/OM5K-10457">https://dev.diamondkey.com/browse/OM5K-10457</a></p>
          <p>OM5K-10384 - <a href="https://dev.diamondkey.com/browse/OM5K-10384">https://dev.diamondkey.com/browse/OM5K-10384</a></p>
          <p>OM5K-10347 - <a href="https://dev.diamondkey.com/browse/OM5K-10347">https://dev.diamondkey.com/browse/OM5K-10347</a></p>
          <p>OM5K-10330 - <a href="https://dev.diamondkey.com/browse/OM5K-10330">https://dev.diamondkey.com/browse/OM5K-10330</a></p>
          <p>OM5K-10297 - <a href="https://dev.diamondkey.com/browse/OM5K-10297">https://dev.diamondkey.com/browse/OM5K-10297</a></p>
          <p>OM5K-10554 - <a href="https://dev.diamondkey.com/browse/OM5K-10554">https://dev.diamondkey.com/browse/OM5K-10554</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.4.0) - 30/05/2022`,
    content: (
      <>
        <>
          <p>OM5K-10040 - <a href="https://dev.diamondkey.com/browse/OM5K-10040">https://dev.diamondkey.com/browse/OM5K-10040</a></p>
          <p>OM5K-8066 - <a href="https://dev.diamondkey.com/browse/OM5K-8066">https://dev.diamondkey.com/browse/OM5K-8066</a></p>
          <p>OM5K-9728 - <a href="https://dev.diamondkey.com/browse/OM5K-9728">https://dev.diamondkey.com/browse/OM5K-9728</a></p>
          <p>OM5K-9729 - <a href="https://dev.diamondkey.com/browse/OM5K-9729">https://dev.diamondkey.com/browse/OM5K-9729</a></p>
          <p>OM5K-9730 - <a href="https://dev.diamondkey.com/browse/OM5K-9730">https://dev.diamondkey.com/browse/OM5K-9730</a></p>
          <p>OM5K-9787 - <a href="https://dev.diamondkey.com/browse/OM5K-9787">https://dev.diamondkey.com/browse/OM5K-9787</a></p>
          <p>OM5K-9839 - <a href="https://dev.diamondkey.com/browse/OM5K-9839">https://dev.diamondkey.com/browse/OM5K-9839</a></p>
          <p>OM5K-9886 - <a href="https://dev.diamondkey.com/browse/OM5K-9886">https://dev.diamondkey.com/browse/OM5K-9886</a></p>
          <p>OM5K-9891 - <a href="https://dev.diamondkey.com/browse/OM5K-9891">https://dev.diamondkey.com/browse/OM5K-9891</a></p>
          <p>OM5K-9895 - <a href="https://dev.diamondkey.com/browse/OM5K-9895">https://dev.diamondkey.com/browse/OM5K-9895</a></p>
          <p>OM5K-9916 - <a href="https://dev.diamondkey.com/browse/OM5K-9916">https://dev.diamondkey.com/browse/OM5K-9916</a></p>
          <p>OM5K-9927 - <a href="https://dev.diamondkey.com/browse/OM5K-9927">https://dev.diamondkey.com/browse/OM5K-9927</a></p>
          <p>OM5K-9928 - <a href="https://dev.diamondkey.com/browse/OM5K-9928">https://dev.diamondkey.com/browse/OM5K-9928</a></p>
          <p>OM5K-9942 - <a href="https://dev.diamondkey.com/browse/OM5K-9942">https://dev.diamondkey.com/browse/OM5K-9942</a></p>
          <p>OM5K-9948 - <a href="https://dev.diamondkey.com/browse/OM5K-9948">https://dev.diamondkey.com/browse/OM5K-9948</a></p>
          <p>OM5K-9967 - <a href="https://dev.diamondkey.com/browse/OM5K-9967">https://dev.diamondkey.com/browse/OM5K-9967</a></p>
          <p>OM5K-9989 - <a href="https://dev.diamondkey.com/browse/OM5K-9989">https://dev.diamondkey.com/browse/OM5K-9989</a></p>
          <p>OM5K-9991 - <a href="https://dev.diamondkey.com/browse/OM5K-9991">https://dev.diamondkey.com/browse/OM5K-9991</a></p>
          <p>OM5K-9995 - <a href="https://dev.diamondkey.com/browse/OM5K-9995">https://dev.diamondkey.com/browse/OM5K-9995</a></p>
          <p>OM5K-10005 - <a href="https://dev.diamondkey.com/browse/OM5K-10005">https://dev.diamondkey.com/browse/OM5K-10005</a></p>
          <p>OM5K-10008 - <a href="https://dev.diamondkey.com/browse/OM5K-10008">https://dev.diamondkey.com/browse/OM5K-10008</a></p>
          <p>OM5K-10045 - <a href="https://dev.diamondkey.com/browse/OM5K-10045">https://dev.diamondkey.com/browse/OM5K-10045</a></p>
          <p>OM5K-10093 - <a href="https://dev.diamondkey.com/browse/OM5K-10093">https://dev.diamondkey.com/browse/OM5K-10093</a></p>
          <p>OM5K-10121 - <a href="https://dev.diamondkey.com/browse/OM5K-10121">https://dev.diamondkey.com/browse/OM5K-10121</a></p>
          <p>OM5K-10123 - <a href="https://dev.diamondkey.com/browse/OM5K-10123">https://dev.diamondkey.com/browse/OM5K-10123</a></p>
          <p>OM5K-10124 - <a href="https://dev.diamondkey.com/browse/OM5K-10124">https://dev.diamondkey.com/browse/OM5K-10124</a></p>
          <p>OM5K-10125 - <a href="https://dev.diamondkey.com/browse/OM5K-10125">https://dev.diamondkey.com/browse/OM5K-10125</a></p>
          <p>OM5K-10129 - <a href="https://dev.diamondkey.com/browse/OM5K-10129">https://dev.diamondkey.com/browse/OM5K-10129</a></p>
          <p>OM5K-10133 - <a href="https://dev.diamondkey.com/browse/OM5K-10133">https://dev.diamondkey.com/browse/OM5K-10133</a></p>
          <p>OM5K-10225 - <a href="https://dev.diamondkey.com/browse/OM5K-10225">https://dev.diamondkey.com/browse/OM5K-10225</a></p>
          <p>OM5K-10261 - <a href="https://dev.diamondkey.com/browse/OM5K-10261">https://dev.diamondkey.com/browse/OM5K-10261</a></p>
          <p>OM5K-10264 - <a href="https://dev.diamondkey.com/browse/OM5K-10264">https://dev.diamondkey.com/browse/OM5K-10264</a></p>
          <p>OM5K-10266 - <a href="https://dev.diamondkey.com/browse/OM5K-10266">https://dev.diamondkey.com/browse/OM5K-10266</a></p>
          <p>OM5K-10284 - <a href="https://dev.diamondkey.com/browse/OM5K-10284">https://dev.diamondkey.com/browse/OM5K-10284</a></p>
          <p>OM5K-10305 - <a href="https://dev.diamondkey.com/browse/OM5K-10305">https://dev.diamondkey.com/browse/OM5K-10305</a></p>
          <p>OM5K-10308 - <a href="https://dev.diamondkey.com/browse/OM5K-10308">https://dev.diamondkey.com/browse/OM5K-10308</a></p>
          <p>OM5K-10309 - <a href="https://dev.diamondkey.com/browse/OM5K-10309">https://dev.diamondkey.com/browse/OM5K-10309</a></p>
          <p>OM5K-10334 - <a href="https://dev.diamondkey.com/browse/OM5K-10334">https://dev.diamondkey.com/browse/OM5K-10334</a></p>
          <p>OM5K-10345 - <a href="https://dev.diamondkey.com/browse/OM5K-10345">https://dev.diamondkey.com/browse/OM5K-10345</a></p>
          <p>OM5K-10351 - <a href="https://dev.diamondkey.com/browse/OM5K-10351">https://dev.diamondkey.com/browse/OM5K-10351</a></p>
          <p>OM5K-8881 - <a href="https://dev.diamondkey.com/browse/OM5K-8881">https://dev.diamondkey.com/browse/OM5K-8881</a></p>
          <p>OM5K-9375 - <a href="https://dev.diamondkey.com/browse/OM5K-9375">https://dev.diamondkey.com/browse/OM5K-9375</a></p>
          <p>OM5K-9492 - <a href="https://dev.diamondkey.com/browse/OM5K-9492">https://dev.diamondkey.com/browse/OM5K-9492</a></p>
          <p>OM5K-9782 - <a href="https://dev.diamondkey.com/browse/OM5K-9782">https://dev.diamondkey.com/browse/OM5K-9782</a></p>
          <p>OM5K-9921 - <a href="https://dev.diamondkey.com/browse/OM5K-9921">https://dev.diamondkey.com/browse/OM5K-9921</a></p>
          <p>OM5K-9932 - <a href="https://dev.diamondkey.com/browse/OM5K-9932">https://dev.diamondkey.com/browse/OM5K-9932</a></p>
          <p>OM5K-9933 - <a href="https://dev.diamondkey.com/browse/OM5K-9933">https://dev.diamondkey.com/browse/OM5K-9933</a></p>
          <p>OM5K-9946 - <a href="https://dev.diamondkey.com/browse/OM5K-9946">https://dev.diamondkey.com/browse/OM5K-9946</a></p>
          <p>OM5K-9953 - <a href="https://dev.diamondkey.com/browse/OM5K-9953">https://dev.diamondkey.com/browse/OM5K-9953</a></p>
          <p>OM5K-9954 - <a href="https://dev.diamondkey.com/browse/OM5K-9954">https://dev.diamondkey.com/browse/OM5K-9954</a></p>
          <p>OM5K-9956 - <a href="https://dev.diamondkey.com/browse/OM5K-9956">https://dev.diamondkey.com/browse/OM5K-9956</a></p>
          <p>OM5K-9959 - <a href="https://dev.diamondkey.com/browse/OM5K-9959">https://dev.diamondkey.com/browse/OM5K-9959</a></p>
          <p>OM5K-9968 - <a href="https://dev.diamondkey.com/browse/OM5K-9968">https://dev.diamondkey.com/browse/OM5K-9968</a></p>
          <p>OM5K-9987 - <a href="https://dev.diamondkey.com/browse/OM5K-9987">https://dev.diamondkey.com/browse/OM5K-9987</a></p>
          <p>OM5K-9990 - <a href="https://dev.diamondkey.com/browse/OM5K-9990">https://dev.diamondkey.com/browse/OM5K-9990</a></p>
          <p>OM5K-10041 - <a href="https://dev.diamondkey.com/browse/OM5K-10041">https://dev.diamondkey.com/browse/OM5K-10041</a></p>
          <p>OM5K-10119 - <a href="https://dev.diamondkey.com/browse/OM5K-10119">https://dev.diamondkey.com/browse/OM5K-10119</a></p>
          <p>OM5K-10128 - <a href="https://dev.diamondkey.com/browse/OM5K-10128">https://dev.diamondkey.com/browse/OM5K-10128</a></p>
          <p>OM5K-8073 - <a href="https://dev.diamondkey.com/browse/OM5K-8073">https://dev.diamondkey.com/browse/OM5K-8073</a></p>
          <p>OM5K-8998 - <a href="https://dev.diamondkey.com/browse/OM5K-8998">https://dev.diamondkey.com/browse/OM5K-8998</a></p>
          <p>OM5K-9099 - <a href="https://dev.diamondkey.com/browse/OM5K-9099">https://dev.diamondkey.com/browse/OM5K-9099</a></p>
          <p>OM5K-9421 - <a href="https://dev.diamondkey.com/browse/OM5K-9421">https://dev.diamondkey.com/browse/OM5K-9421</a></p>
          <p>OM5K-9858 - <a href="https://dev.diamondkey.com/browse/OM5K-9858">https://dev.diamondkey.com/browse/OM5K-9858</a></p>
          <p>OM5K-9864 - <a href="https://dev.diamondkey.com/browse/OM5K-9864">https://dev.diamondkey.com/browse/OM5K-9864</a></p>
          <p>OM5K-9984 - <a href="https://dev.diamondkey.com/browse/OM5K-9984">https://dev.diamondkey.com/browse/OM5K-9984</a></p>
          <p>OM5K-9985 - <a href="https://dev.diamondkey.com/browse/OM5K-9985">https://dev.diamondkey.com/browse/OM5K-9985</a></p>
          <p>OM5K-9986 - <a href="https://dev.diamondkey.com/browse/OM5K-9986">https://dev.diamondkey.com/browse/OM5K-9986</a></p>
          <p>OM5K-9988 - <a href="https://dev.diamondkey.com/browse/OM5K-9988">https://dev.diamondkey.com/browse/OM5K-9988</a></p>
          <p>OM5K-10043 - <a href="https://dev.diamondkey.com/browse/OM5K-10043">https://dev.diamondkey.com/browse/OM5K-10043</a></p>
          <p>OM5K-10179 - <a href="https://dev.diamondkey.com/browse/OM5K-10179">https://dev.diamondkey.com/browse/OM5K-10179</a></p>
          <p>OM5K-7495 - <a href="https://dev.diamondkey.com/browse/OM5K-7495">https://dev.diamondkey.com/browse/OM5K-7495</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.3.0-rc.2) - 17/12/2021`,
    content: (
      <>
        <>
          <p>OM5K-9641 - <a href="https://dev.diamondkey.com/browse/OM5K-9641">https://dev.diamondkey.com/browse/OM5K-9641</a></p>
          <p>OM5K-9856 - <a href="https://dev.diamondkey.com/browse/OM5K-9856">https://dev.diamondkey.com/browse/OM5K-9856</a></p>
          <p>OM5K-9862 - <a href="https://dev.diamondkey.com/browse/OM5K-9862">https://dev.diamondkey.com/browse/OM5K-9862</a></p>
          <p>OM5K-9863 - <a href="https://dev.diamondkey.com/browse/OM5K-9863">https://dev.diamondkey.com/browse/OM5K-9863</a></p>
          <p>OM5K-9886 - <a href="https://dev.diamondkey.com/browse/OM5K-9886">https://dev.diamondkey.com/browse/OM5K-9886</a></p>
          <p>OM5K-9891 - <a href="https://dev.diamondkey.com/browse/OM5K-9891">https://dev.diamondkey.com/browse/OM5K-9891</a></p>
          <p>OM5K-9916 - <a href="https://dev.diamondkey.com/browse/OM5K-9916">https://dev.diamondkey.com/browse/OM5K-9916</a></p>
          <p>OM5K-9373 - <a href="https://dev.diamondkey.com/browse/OM5K-9373">https://dev.diamondkey.com/browse/OM5K-9373</a></p>
          <p>OM5K-9374 - <a href="https://dev.diamondkey.com/browse/OM5K-9374">https://dev.diamondkey.com/browse/OM5K-9374</a></p>
          <p>OM5K-9892 - <a href="https://dev.diamondkey.com/browse/OM5K-9892">https://dev.diamondkey.com/browse/OM5K-9892</a></p>
          <p>OM5K-9704 - <a href="https://dev.diamondkey.com/browse/OM5K-9704">https://dev.diamondkey.com/browse/OM5K-9704</a></p>
          <p>OM5K-9871 - <a href="https://dev.diamondkey.com/browse/OM5K-9871">https://dev.diamondkey.com/browse/OM5K-9871</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.3.0-rc.1) - 24/11/2021`,
    content: (
      <>
        <>
          <p>OM5K-9708 - <a href="https://dev.diamondkey.com/browse/OM5K-9708">https://dev.diamondkey.com/browse/OM5K-9708</a></p>
          <p>OM5K-9803 - <a href="https://dev.diamondkey.com/browse/OM5K-9803">https://dev.diamondkey.com/browse/OM5K-9803</a></p>
          <p>OM5K-9818 - <a href="https://dev.diamondkey.com/browse/OM5K-9818">https://dev.diamondkey.com/browse/OM5K-9818</a></p>
          <p>OM5K-9819 - <a href="https://dev.diamondkey.com/browse/OM5K-9819">https://dev.diamondkey.com/browse/OM5K-9819</a></p>
          <p>OM5K-9820 - <a href="https://dev.diamondkey.com/browse/OM5K-9820">https://dev.diamondkey.com/browse/OM5K-9820</a></p>
          <p>OM5K-9821 - <a href="https://dev.diamondkey.com/browse/OM5K-9821">https://dev.diamondkey.com/browse/OM5K-9821</a></p>
          <p>OM5K-9822 - <a href="https://dev.diamondkey.com/browse/OM5K-9822">https://dev.diamondkey.com/browse/OM5K-9822</a></p>
          <p>OM5K-9823 - <a href="https://dev.diamondkey.com/browse/OM5K-9823">https://dev.diamondkey.com/browse/OM5K-9823</a></p>
          <p>OM5K-9841 - <a href="https://dev.diamondkey.com/browse/OM5K-9841">https://dev.diamondkey.com/browse/OM5K-9841</a></p>
          <p>OM5K-9842 - <a href="https://dev.diamondkey.com/browse/OM5K-9842">https://dev.diamondkey.com/browse/OM5K-9842</a></p>
          <p>OM5K-9845 - <a href="https://dev.diamondkey.com/browse/OM5K-9845">https://dev.diamondkey.com/browse/OM5K-9845</a></p>
          <p>OM5K-9851 - <a href="https://dev.diamondkey.com/browse/OM5K-9851">https://dev.diamondkey.com/browse/OM5K-9851</a></p>
          <p>OM5K-9857 - <a href="https://dev.diamondkey.com/browse/OM5K-9857">https://dev.diamondkey.com/browse/OM5K-9857</a></p>
          <p>OM5K-9859 - <a href="https://dev.diamondkey.com/browse/OM5K-9859">https://dev.diamondkey.com/browse/OM5K-9859</a></p>
          <p>OM5K-9861 - <a href="https://dev.diamondkey.com/browse/OM5K-9861">https://dev.diamondkey.com/browse/OM5K-9861</a></p>
          <p>OM5K-9869 - <a href="https://dev.diamondkey.com/browse/OM5K-9869">https://dev.diamondkey.com/browse/OM5K-9869</a></p>
          <p>OM5K-9366 - <a href="https://dev.diamondkey.com/browse/OM5K-9366">https://dev.diamondkey.com/browse/OM5K-9366</a></p>
          <p>OM5K-9788 - <a href="https://dev.diamondkey.com/browse/OM5K-9788">https://dev.diamondkey.com/browse/OM5K-9788</a></p>
          <p>OM5K-9797 - <a href="https://dev.diamondkey.com/browse/OM5K-9797">https://dev.diamondkey.com/browse/OM5K-9797</a></p>
          <p>OM5K-9798 - <a href="https://dev.diamondkey.com/browse/OM5K-9798">https://dev.diamondkey.com/browse/OM5K-9798</a></p>
          <p>OM5K-9868 - <a href="https://dev.diamondkey.com/browse/OM5K-9868">https://dev.diamondkey.com/browse/OM5K-9868</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.6) - 24/11/2021`,
    content: (
      <>
        <>
          <p>OM5K-9708 - <a href="https://dev.diamondkey.com/browse/OM5K-9708">https://dev.diamondkey.com/browse/OM5K-9708</a></p>
          <p>OM5K-9794 - <a href="https://dev.diamondkey.com/browse/OM5K-9794">https://dev.diamondkey.com/browse/OM5K-9794</a></p>
          <p>OM5K-9841 - <a href="https://dev.diamondkey.com/browse/OM5K-9841">https://dev.diamondkey.com/browse/OM5K-9841</a></p>
          <p>OM5K-9845 - <a href="https://dev.diamondkey.com/browse/OM5K-9845">https://dev.diamondkey.com/browse/OM5K-9845</a></p>
          <p>OM5K-9851 - <a href="https://dev.diamondkey.com/browse/OM5K-9851">https://dev.diamondkey.com/browse/OM5K-9851</a></p>
          <p>OM5K-9857 - <a href="https://dev.diamondkey.com/browse/OM5K-9857">https://dev.diamondkey.com/browse/OM5K-9857</a></p>
          <p>OM5K-9859 - <a href="https://dev.diamondkey.com/browse/OM5K-9859">https://dev.diamondkey.com/browse/OM5K-9859</a></p>
          <p>OM5K-9861 - <a href="https://dev.diamondkey.com/browse/OM5K-9861">https://dev.diamondkey.com/browse/OM5K-9861</a></p>
          <p>OM5K-9869 - <a href="https://dev.diamondkey.com/browse/OM5K-9869">https://dev.diamondkey.com/browse/OM5K-9869</a></p>
          <p>OM5K-9366 - <a href="https://dev.diamondkey.com/browse/OM5K-9366">https://dev.diamondkey.com/browse/OM5K-9366</a></p>
          <p>OM5K-9788 - <a href="https://dev.diamondkey.com/browse/OM5K-9788">https://dev.diamondkey.com/browse/OM5K-9788</a></p>
          <p>OM5K-9789 - <a href="https://dev.diamondkey.com/browse/OM5K-9789">https://dev.diamondkey.com/browse/OM5K-9789</a></p>
          <p>OM5K-9797 - <a href="https://dev.diamondkey.com/browse/OM5K-9797">https://dev.diamondkey.com/browse/OM5K-9797</a></p>
          <p>OM5K-9798 - <a href="https://dev.diamondkey.com/browse/OM5K-9798">https://dev.diamondkey.com/browse/OM5K-9798</a></p>
          <p>OM5K-9459 - <a href="https://dev.diamondkey.com/browse/OM5K-9459">https://dev.diamondkey.com/browse/OM5K-9459</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.5) - 26/10/2021`,
    content: (
      <>
        <>
          <p>OM5K-9017 - <a href="https://dev.diamondkey.com/browse/OM5K-9017">https://dev.diamondkey.com/browse/OM5K-9017</a></p>
          <p>OM5K-9778 - <a href="https://dev.diamondkey.com/browse/OM5K-9778">https://dev.diamondkey.com/browse/OM5K-9778</a></p>
          <p>OM5K-9780 - <a href="https://dev.diamondkey.com/browse/OM5K-9780">https://dev.diamondkey.com/browse/OM5K-9780</a></p>
          <p>OM5K-9791 - <a href="https://dev.diamondkey.com/browse/OM5K-9791">https://dev.diamondkey.com/browse/OM5K-9791</a></p>
          <p>OM5K-9422 - <a href="https://dev.diamondkey.com/browse/OM5K-9422">https://dev.diamondkey.com/browse/OM5K-9422</a></p>
          <p>OM5K-9490 - <a href="https://dev.diamondkey.com/browse/OM5K-9490">https://dev.diamondkey.com/browse/OM5K-9490</a></p>
          <p>OM5K-9781 - <a href="https://dev.diamondkey.com/browse/OM5K-9781">https://dev.diamondkey.com/browse/OM5K-9781</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.4) - 08/10/2021`,
    content: (
      <>
        <>
          <p>OM5K-9458 - <a href="https://dev.diamondkey.com/browse/OM5K-9458">https://dev.diamondkey.com/browse/OM5K-9458</a></p>
          <p>OM5K-9468 - <a href="https://dev.diamondkey.com/browse/OM5K-9468">https://dev.diamondkey.com/browse/OM5K-9468</a></p>
          <p>OM5K-9729 - <a href="https://dev.diamondkey.com/browse/OM5K-9729">https://dev.diamondkey.com/browse/OM5K-9729</a></p>
          <p>OM5K-9744 - <a href="https://dev.diamondkey.com/browse/OM5K-9744">https://dev.diamondkey.com/browse/OM5K-9744</a></p>
          <p>OM5K-9745 - <a href="https://dev.diamondkey.com/browse/OM5K-9745">https://dev.diamondkey.com/browse/OM5K-9745</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.3) - 24/09/2021`,
    content: (
      <>
        <>
          <p>OM5K-9468 - <a href="https://dev.diamondkey.com/browse/OM5K-9468">https://dev.diamondkey.com/browse/OM5K-9468</a></p>
          <p>OM5K-9706 - <a href="https://dev.diamondkey.com/browse/OM5K-9706">https://dev.diamondkey.com/browse/OM5K-9706</a></p>
          <p>OM5K-9705 - <a href="https://dev.diamondkey.com/browse/OM5K-9705">https://dev.diamondkey.com/browse/OM5K-9705</a></p>
          <p>OM5K-9717 - <a href="https://dev.diamondkey.com/browse/OM5K-9717">https://dev.diamondkey.com/browse/OM5K-9717</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.2) - 08/09/2021`,
    content: (
      <>
        <>
          <p>OM5K-8985 - <a href="https://dev.diamondkey.com/browse/OM5K-8985">https://dev.diamondkey.com/browse/OM5K-8985</a></p>
          <p>OM5K-9081 - <a href="https://dev.diamondkey.com/browse/OM5K-9081">https://dev.diamondkey.com/browse/OM5K-9081</a></p>
          <p>OM5K-9314 - <a href="https://dev.diamondkey.com/browse/OM5K-9314">https://dev.diamondkey.com/browse/OM5K-9314</a></p>
          <p>OM5K-9316 - <a href="https://dev.diamondkey.com/browse/OM5K-9316">https://dev.diamondkey.com/browse/OM5K-9316</a></p>
          <p>OM5K-9438 - <a href="https://dev.diamondkey.com/browse/OM5K-9438">https://dev.diamondkey.com/browse/OM5K-9438</a></p>
          <p>OM5K-9458 - <a href="https://dev.diamondkey.com/browse/OM5K-9458">https://dev.diamondkey.com/browse/OM5K-9458</a></p>
          <p>OM5K-9486 - <a href="https://dev.diamondkey.com/browse/OM5K-9486">https://dev.diamondkey.com/browse/OM5K-9486</a></p>
          <p>OM5K-9505 - <a href="https://dev.diamondkey.com/browse/OM5K-9505">https://dev.diamondkey.com/browse/OM5K-9505</a></p>
          <p>OM5K-9663 - <a href="https://dev.diamondkey.com/browse/OM5K-9663">https://dev.diamondkey.com/browse/OM5K-9663</a></p>
          <p>OM5K-9634 - <a href="https://dev.diamondkey.com/browse/OM5K-9634">https://dev.diamondkey.com/browse/OM5K-9634</a></p>
          <p>OM5K-9497 - <a href="https://dev.diamondkey.com/browse/OM5K-9497">https://dev.diamondkey.com/browse/OM5K-9497</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.1-rc.1) - 02/08/2021`,
    content: (
      <>
        <>
          <p>OM5K-8973 - <a href="https://dev.diamondkey.com/browse/OM5K-8973">https://dev.diamondkey.com/browse/OM5K-8973</a></p>
          <p>OM5K-9081 - <a href="https://dev.diamondkey.com/browse/OM5K-9081">https://dev.diamondkey.com/browse/OM5K-9081</a></p>
          <p>OM5K-9408 - <a href="https://dev.diamondkey.com/browse/OM5K-9408">https://dev.diamondkey.com/browse/OM5K-9408</a></p>
          <p>OM5K-9440 - <a href="https://dev.diamondkey.com/browse/OM5K-9440">https://dev.diamondkey.com/browse/OM5K-9440</a></p>
          <p>OM5K-9177 - <a href="https://dev.diamondkey.com/browse/OM5K-9177">https://dev.diamondkey.com/browse/OM5K-9177</a></p>
          <p>OM5K-9179 - <a href="https://dev.diamondkey.com/browse/OM5K-9179">https://dev.diamondkey.com/browse/OM5K-9179</a></p>
          <p>OM5K-9191 - <a href="https://dev.diamondkey.com/browse/OM5K-9191">https://dev.diamondkey.com/browse/OM5K-9191</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.2.0) - 27/07/2021`,
    content: (
      <>
        <>
          <p>OM5K-8758 - <a href="https://dev.diamondkey.com/browse/OM5K-8758">https://dev.diamondkey.com/browse/OM5K-8758</a></p>
          <p>OM5K-9080 - <a href="https://dev.diamondkey.com/browse/OM5K-9080">https://dev.diamondkey.com/browse/OM5K-9080</a></p>
          <p>OM5K-9103 - <a href="https://dev.diamondkey.com/browse/OM5K-9103">https://dev.diamondkey.com/browse/OM5K-9103</a></p>
          <p>OM5K-9122 - <a href="https://dev.diamondkey.com/browse/OM5K-9122">https://dev.diamondkey.com/browse/OM5K-9122</a></p>
          <p>OM5K-9140 - <a href="https://dev.diamondkey.com/browse/OM5K-9140">https://dev.diamondkey.com/browse/OM5K-9140</a></p>
          <p>OM5K-9163 - <a href="https://dev.diamondkey.com/browse/OM5K-9163">https://dev.diamondkey.com/browse/OM5K-9163</a></p>
          <p>OM5K-9164 - <a href="https://dev.diamondkey.com/browse/OM5K-9164">https://dev.diamondkey.com/browse/OM5K-9164</a></p>
          <p>OM5K-9168 - <a href="https://dev.diamondkey.com/browse/OM5K-9168">https://dev.diamondkey.com/browse/OM5K-9168</a></p>
          <p>OM5K-9169 - <a href="https://dev.diamondkey.com/browse/OM5K-9169">https://dev.diamondkey.com/browse/OM5K-9169</a></p>
          <p>OM5K-9171 - <a href="https://dev.diamondkey.com/browse/OM5K-9171">https://dev.diamondkey.com/browse/OM5K-9171</a></p>
          <p>OM5K-9172 - <a href="https://dev.diamondkey.com/browse/OM5K-9172">https://dev.diamondkey.com/browse/OM5K-9172</a></p>
          <p>OM5K-9173 - <a href="https://dev.diamondkey.com/browse/OM5K-9173">https://dev.diamondkey.com/browse/OM5K-9173</a></p>
          <p>OM5K-9210 - <a href="https://dev.diamondkey.com/browse/OM5K-9210">https://dev.diamondkey.com/browse/OM5K-9210</a></p>
          <p>OM5K-9228 - <a href="https://dev.diamondkey.com/browse/OM5K-9228">https://dev.diamondkey.com/browse/OM5K-9228</a></p>
          <p>OM5K-9302 - <a href="https://dev.diamondkey.com/browse/OM5K-9302">https://dev.diamondkey.com/browse/OM5K-9302</a></p>
          <p>OM5K-9303 - <a href="https://dev.diamondkey.com/browse/OM5K-9303">https://dev.diamondkey.com/browse/OM5K-9303</a></p>
          <p>OM5K-9304 - <a href="https://dev.diamondkey.com/browse/OM5K-9304">https://dev.diamondkey.com/browse/OM5K-9304</a></p>
          <p>OM5K-9314 - <a href="https://dev.diamondkey.com/browse/OM5K-9314">https://dev.diamondkey.com/browse/OM5K-9314</a></p>
          <p>OM5K-9315 - <a href="https://dev.diamondkey.com/browse/OM5K-9315">https://dev.diamondkey.com/browse/OM5K-9315</a></p>
          <p>OM5K-9329 - <a href="https://dev.diamondkey.com/browse/OM5K-9329">https://dev.diamondkey.com/browse/OM5K-9329</a></p>
          <p>OM5K-9346 - <a href="https://dev.diamondkey.com/browse/OM5K-9346">https://dev.diamondkey.com/browse/OM5K-9346</a></p>
          <p>OM5K-9368 - <a href="https://dev.diamondkey.com/browse/OM5K-9368">https://dev.diamondkey.com/browse/OM5K-9368</a></p>
          <p>OM5K-7831 - <a href="https://dev.diamondkey.com/browse/OM5K-7831">https://dev.diamondkey.com/browse/OM5K-7831</a></p>
          <p>OM5K-8008 - <a href="https://dev.diamondkey.com/browse/OM5K-8008">https://dev.diamondkey.com/browse/OM5K-8008</a></p>
          <p>OM5K-8284 - <a href="https://dev.diamondkey.com/browse/OM5K-8284">https://dev.diamondkey.com/browse/OM5K-8284</a></p>
          <p>OM5K-8753 - <a href="https://dev.diamondkey.com/browse/OM5K-8753">https://dev.diamondkey.com/browse/OM5K-8753</a></p>
          <p>OM5K-8850 - <a href="https://dev.diamondkey.com/browse/OM5K-8850">https://dev.diamondkey.com/browse/OM5K-8850</a></p>
          <p>OM5K-8862 - <a href="https://dev.diamondkey.com/browse/OM5K-8862">https://dev.diamondkey.com/browse/OM5K-8862</a></p>
          <p>OM5K-8947 - <a href="https://dev.diamondkey.com/browse/OM5K-8947">https://dev.diamondkey.com/browse/OM5K-8947</a></p>
          <p>OM5K-9013 - <a href="https://dev.diamondkey.com/browse/OM5K-9013">https://dev.diamondkey.com/browse/OM5K-9013</a></p>
          <p>OM5K-9034 - <a href="https://dev.diamondkey.com/browse/OM5K-9034">https://dev.diamondkey.com/browse/OM5K-9034</a></p>
          <p>OM5K-9072 - <a href="https://dev.diamondkey.com/browse/OM5K-9072">https://dev.diamondkey.com/browse/OM5K-9072</a></p>
          <p>OM5K-9089 - <a href="https://dev.diamondkey.com/browse/OM5K-9089">https://dev.diamondkey.com/browse/OM5K-9089</a></p>
          <p>OM5K-9091 - <a href="https://dev.diamondkey.com/browse/OM5K-9091">https://dev.diamondkey.com/browse/OM5K-9091</a></p>
          <p>OM5K-9096 - <a href="https://dev.diamondkey.com/browse/OM5K-9096">https://dev.diamondkey.com/browse/OM5K-9096</a></p>
          <p>OM5K-9101 - <a href="https://dev.diamondkey.com/browse/OM5K-9101">https://dev.diamondkey.com/browse/OM5K-9101</a></p>
          <p>OM5K-9102 - <a href="https://dev.diamondkey.com/browse/OM5K-9102">https://dev.diamondkey.com/browse/OM5K-9102</a></p>
          <p>OM5K-9106 - <a href="https://dev.diamondkey.com/browse/OM5K-9106">https://dev.diamondkey.com/browse/OM5K-9106</a></p>
          <p>OM5K-9112 - <a href="https://dev.diamondkey.com/browse/OM5K-9112">https://dev.diamondkey.com/browse/OM5K-9112</a></p>
          <p>OM5K-9113 - <a href="https://dev.diamondkey.com/browse/OM5K-9113">https://dev.diamondkey.com/browse/OM5K-9113</a></p>
          <p>OM5K-9115 - <a href="https://dev.diamondkey.com/browse/OM5K-9115">https://dev.diamondkey.com/browse/OM5K-9115</a></p>
          <p>OM5K-9116 - <a href="https://dev.diamondkey.com/browse/OM5K-9116">https://dev.diamondkey.com/browse/OM5K-9116</a></p>
          <p>OM5K-9117 - <a href="https://dev.diamondkey.com/browse/OM5K-9117">https://dev.diamondkey.com/browse/OM5K-9117</a></p>
          <p>OM5K-9139 - <a href="https://dev.diamondkey.com/browse/OM5K-9139">https://dev.diamondkey.com/browse/OM5K-9139</a></p>
          <p>OM5K-9141 - <a href="https://dev.diamondkey.com/browse/OM5K-9141">https://dev.diamondkey.com/browse/OM5K-9141</a></p>
          <p>OM5K-9232 - <a href="https://dev.diamondkey.com/browse/OM5K-9232">https://dev.diamondkey.com/browse/OM5K-9232</a></p>
          <p>OM5K-9299 - <a href="https://dev.diamondkey.com/browse/OM5K-9299">https://dev.diamondkey.com/browse/OM5K-9299</a></p>
          <p>OM5K-9300 - <a href="https://dev.diamondkey.com/browse/OM5K-9300">https://dev.diamondkey.com/browse/OM5K-9300</a></p>
          <p>OM5K-9367 - <a href="https://dev.diamondkey.com/browse/OM5K-9367">https://dev.diamondkey.com/browse/OM5K-9367</a></p>
          <p>OM5K-9426 - <a href="https://dev.diamondkey.com/browse/OM5K-9426">https://dev.diamondkey.com/browse/OM5K-9426</a></p>
          <p>OM5K-9428 - <a href="https://dev.diamondkey.com/browse/OM5K-9428">https://dev.diamondkey.com/browse/OM5K-9428</a></p>
          <p>OM5K-8736 - <a href="https://dev.diamondkey.com/browse/OM5K-8736">https://dev.diamondkey.com/browse/OM5K-8736</a></p>
          <p>OM5K-8946 - <a href="https://dev.diamondkey.com/browse/OM5K-8946">https://dev.diamondkey.com/browse/OM5K-8946</a></p>
          <p>OM5K-8958 - <a href="https://dev.diamondkey.com/browse/OM5K-8958">https://dev.diamondkey.com/browse/OM5K-8958</a></p>
          <p>OM5K-9014 - <a href="https://dev.diamondkey.com/browse/OM5K-9014">https://dev.diamondkey.com/browse/OM5K-9014</a></p>
          <p>OM5K-9024 - <a href="https://dev.diamondkey.com/browse/OM5K-9024">https://dev.diamondkey.com/browse/OM5K-9024</a></p>
          <p>OM5K-9031 - <a href="https://dev.diamondkey.com/browse/OM5K-9031">https://dev.diamondkey.com/browse/OM5K-9031</a></p>
          <p>OM5K-9095 - <a href="https://dev.diamondkey.com/browse/OM5K-9095">https://dev.diamondkey.com/browse/OM5K-9095</a></p>
          <p>OM5K-9105 - <a href="https://dev.diamondkey.com/browse/OM5K-9105">https://dev.diamondkey.com/browse/OM5K-9105</a></p>
          <p>OM5K-9107 - <a href="https://dev.diamondkey.com/browse/OM5K-9107">https://dev.diamondkey.com/browse/OM5K-9107</a></p>
          <p>OM5K-9121 - <a href="https://dev.diamondkey.com/browse/OM5K-9121">https://dev.diamondkey.com/browse/OM5K-9121</a></p>
          <p>OM5K-9131 - <a href="https://dev.diamondkey.com/browse/OM5K-9131">https://dev.diamondkey.com/browse/OM5K-9131</a></p>
          <p>OM5K-9134 - <a href="https://dev.diamondkey.com/browse/OM5K-9134">https://dev.diamondkey.com/browse/OM5K-9134</a></p>
          <p>OM5K-9178 - <a href="https://dev.diamondkey.com/browse/OM5K-9178">https://dev.diamondkey.com/browse/OM5K-9178</a></p>
          <p>OM5K-9181 - <a href="https://dev.diamondkey.com/browse/OM5K-9181">https://dev.diamondkey.com/browse/OM5K-9181</a></p>
          <p>OM5K-9182 - <a href="https://dev.diamondkey.com/browse/OM5K-9182">https://dev.diamondkey.com/browse/OM5K-9182</a></p>
          <p>OM5K-9199 - <a href="https://dev.diamondkey.com/browse/OM5K-9199">https://dev.diamondkey.com/browse/OM5K-9199</a></p>
          <p>OM5K-9200 - <a href="https://dev.diamondkey.com/browse/OM5K-9200">https://dev.diamondkey.com/browse/OM5K-9200</a></p>
          <p>OM5K-9201 - <a href="https://dev.diamondkey.com/browse/OM5K-9201">https://dev.diamondkey.com/browse/OM5K-9201</a></p>
          <p>OM5K-9202 - <a href="https://dev.diamondkey.com/browse/OM5K-9202">https://dev.diamondkey.com/browse/OM5K-9202</a></p>
          <p>OM5K-9331 - <a href="https://dev.diamondkey.com/browse/OM5K-9331">https://dev.diamondkey.com/browse/OM5K-9331</a></p>
          <p>OM5K-9341 - <a href="https://dev.diamondkey.com/browse/OM5K-9341">https://dev.diamondkey.com/browse/OM5K-9341</a></p>
          <p>OM5K-9437 - <a href="https://dev.diamondkey.com/browse/OM5K-9437">https://dev.diamondkey.com/browse/OM5K-9437</a></p>
          <p>OM5K-8970 - <a href="https://dev.diamondkey.com/browse/OM5K-8970">https://dev.diamondkey.com/browse/OM5K-8970</a></p>
          <p>OM5K-9083 - <a href="https://dev.diamondkey.com/browse/OM5K-9083">https://dev.diamondkey.com/browse/OM5K-9083</a></p>
          <p>OM5K-9084 - <a href="https://dev.diamondkey.com/browse/OM5K-9084">https://dev.diamondkey.com/browse/OM5K-9084</a></p>
          <p>OM5K-9085 - <a href="https://dev.diamondkey.com/browse/OM5K-9085">https://dev.diamondkey.com/browse/OM5K-9085</a></p>
          <p>OM5K-9127 - <a href="https://dev.diamondkey.com/browse/OM5K-9127">https://dev.diamondkey.com/browse/OM5K-9127</a></p>
          <p>OM5K-9133 - <a href="https://dev.diamondkey.com/browse/OM5K-9133">https://dev.diamondkey.com/browse/OM5K-9133</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.16) - 05/05/2021`,
    content: (
      <>
        <>
          <p>OM5K-8488 - <a href="https://dev.diamondkey.com/browse/OM5K-8488">https://dev.diamondkey.com/browse/OM5K-8488</a></p>
          <p>OM5K-9021 - <a href="https://dev.diamondkey.com/browse/OM5K-9021">https://dev.diamondkey.com/browse/OM5K-9021</a></p>
          <p>OM5K-8268 - <a href="https://dev.diamondkey.com/browse/OM5K-8268">https://dev.diamondkey.com/browse/OM5K-8268</a></p>
          <p>OM5K-8271 - <a href="https://dev.diamondkey.com/browse/OM5K-8271">https://dev.diamondkey.com/browse/OM5K-8271</a></p>
          <p>OM5K-8491 - <a href="https://dev.diamondkey.com/browse/OM5K-8491">https://dev.diamondkey.com/browse/OM5K-8491</a></p>
          <p>OM5K-8507 - <a href="https://dev.diamondkey.com/browse/OM5K-8507">https://dev.diamondkey.com/browse/OM5K-8507</a></p>
          <p>OM5K-8585 - <a href="https://dev.diamondkey.com/browse/OM5K-8585">https://dev.diamondkey.com/browse/OM5K-8585</a></p>
          <p>OM5K-8586 - <a href="https://dev.diamondkey.com/browse/OM5K-8586">https://dev.diamondkey.com/browse/OM5K-8586</a></p>
          <p>OM5K-8587 - <a href="https://dev.diamondkey.com/browse/OM5K-8587">https://dev.diamondkey.com/browse/OM5K-8587</a></p>
          <p>OM5K-8588 - <a href="https://dev.diamondkey.com/browse/OM5K-8588">https://dev.diamondkey.com/browse/OM5K-8588</a></p>
          <p>OM5K-8589 - <a href="https://dev.diamondkey.com/browse/OM5K-8589">https://dev.diamondkey.com/browse/OM5K-8589</a></p>
          <p>OM5K-8591 - <a href="https://dev.diamondkey.com/browse/OM5K-8591">https://dev.diamondkey.com/browse/OM5K-8591</a></p>
          <p>OM5K-8592 - <a href="https://dev.diamondkey.com/browse/OM5K-8592">https://dev.diamondkey.com/browse/OM5K-8592</a></p>
          <p>OM5K-8593 - <a href="https://dev.diamondkey.com/browse/OM5K-8593">https://dev.diamondkey.com/browse/OM5K-8593</a></p>
          <p>OM5K-8594 - <a href="https://dev.diamondkey.com/browse/OM5K-8594">https://dev.diamondkey.com/browse/OM5K-8594</a></p>
          <p>OM5K-8595 - <a href="https://dev.diamondkey.com/browse/OM5K-8595">https://dev.diamondkey.com/browse/OM5K-8595</a></p>
          <p>OM5K-8665 - <a href="https://dev.diamondkey.com/browse/OM5K-8665">https://dev.diamondkey.com/browse/OM5K-8665</a></p>
          <p>OM5K-8704 - <a href="https://dev.diamondkey.com/browse/OM5K-8704">https://dev.diamondkey.com/browse/OM5K-8704</a></p>
          <p>OM5K-8705 - <a href="https://dev.diamondkey.com/browse/OM5K-8705">https://dev.diamondkey.com/browse/OM5K-8705</a></p>
          <p>OM5K-8706 - <a href="https://dev.diamondkey.com/browse/OM5K-8706">https://dev.diamondkey.com/browse/OM5K-8706</a></p>
          <p>OM5K-8707 - <a href="https://dev.diamondkey.com/browse/OM5K-8707">https://dev.diamondkey.com/browse/OM5K-8707</a></p>
          <p>OM5K-8708 - <a href="https://dev.diamondkey.com/browse/OM5K-8708">https://dev.diamondkey.com/browse/OM5K-8708</a></p>
          <p>OM5K-8757 - <a href="https://dev.diamondkey.com/browse/OM5K-8757">https://dev.diamondkey.com/browse/OM5K-8757</a></p>
          <p>OM5K-8759 - <a href="https://dev.diamondkey.com/browse/OM5K-8759">https://dev.diamondkey.com/browse/OM5K-8759</a></p>
          <p>OM5K-8760 - <a href="https://dev.diamondkey.com/browse/OM5K-8760">https://dev.diamondkey.com/browse/OM5K-8760</a></p>
          <p>OM5K-8785 - <a href="https://dev.diamondkey.com/browse/OM5K-8785">https://dev.diamondkey.com/browse/OM5K-8785</a></p>
          <p>OM5K-8786 - <a href="https://dev.diamondkey.com/browse/OM5K-8786">https://dev.diamondkey.com/browse/OM5K-8786</a></p>
          <p>OM5K-8787 - <a href="https://dev.diamondkey.com/browse/OM5K-8787">https://dev.diamondkey.com/browse/OM5K-8787</a></p>
          <p>OM5K-8831 - <a href="https://dev.diamondkey.com/browse/OM5K-8831">https://dev.diamondkey.com/browse/OM5K-8831</a></p>
          <p>OM5K-8841 - <a href="https://dev.diamondkey.com/browse/OM5K-8841">https://dev.diamondkey.com/browse/OM5K-8841</a></p>
          <p>OM5K-8843 - <a href="https://dev.diamondkey.com/browse/OM5K-8843">https://dev.diamondkey.com/browse/OM5K-8843</a></p>
          <p>OM5K-8853 - <a href="https://dev.diamondkey.com/browse/OM5K-8853">https://dev.diamondkey.com/browse/OM5K-8853</a></p>
          <p>OM5K-8855 - <a href="https://dev.diamondkey.com/browse/OM5K-8855">https://dev.diamondkey.com/browse/OM5K-8855</a></p>
          <p>OM5K-8879 - <a href="https://dev.diamondkey.com/browse/OM5K-8879">https://dev.diamondkey.com/browse/OM5K-8879</a></p>
          <p>OM5K-8880 - <a href="https://dev.diamondkey.com/browse/OM5K-8880">https://dev.diamondkey.com/browse/OM5K-8880</a></p>
          <p>OM5K-8883 - <a href="https://dev.diamondkey.com/browse/OM5K-8883">https://dev.diamondkey.com/browse/OM5K-8883</a></p>
          <p>OM5K-8884 - <a href="https://dev.diamondkey.com/browse/OM5K-8884">https://dev.diamondkey.com/browse/OM5K-8884</a></p>
          <p>OM5K-8885 - <a href="https://dev.diamondkey.com/browse/OM5K-8885">https://dev.diamondkey.com/browse/OM5K-8885</a></p>
          <p>OM5K-8886 - <a href="https://dev.diamondkey.com/browse/OM5K-8886">https://dev.diamondkey.com/browse/OM5K-8886</a></p>
          <p>OM5K-8887 - <a href="https://dev.diamondkey.com/browse/OM5K-8887">https://dev.diamondkey.com/browse/OM5K-8887</a></p>
          <p>OM5K-8888 - <a href="https://dev.diamondkey.com/browse/OM5K-8888">https://dev.diamondkey.com/browse/OM5K-8888</a></p>
          <p>OM5K-8889 - <a href="https://dev.diamondkey.com/browse/OM5K-8889">https://dev.diamondkey.com/browse/OM5K-8889</a></p>
          <p>OM5K-8891 - <a href="https://dev.diamondkey.com/browse/OM5K-8891">https://dev.diamondkey.com/browse/OM5K-8891</a></p>
          <p>OM5K-8892 - <a href="https://dev.diamondkey.com/browse/OM5K-8892">https://dev.diamondkey.com/browse/OM5K-8892</a></p>
          <p>OM5K-8893 - <a href="https://dev.diamondkey.com/browse/OM5K-8893">https://dev.diamondkey.com/browse/OM5K-8893</a></p>
          <p>OM5K-8903 - <a href="https://dev.diamondkey.com/browse/OM5K-8903">https://dev.diamondkey.com/browse/OM5K-8903</a></p>
          <p>OM5K-8950 - <a href="https://dev.diamondkey.com/browse/OM5K-8950">https://dev.diamondkey.com/browse/OM5K-8950</a></p>
          <p>OM5K-8951 - <a href="https://dev.diamondkey.com/browse/OM5K-8951">https://dev.diamondkey.com/browse/OM5K-8951</a></p>
          <p>OM5K-8959 - <a href="https://dev.diamondkey.com/browse/OM5K-8959">https://dev.diamondkey.com/browse/OM5K-8959</a></p>
          <p>OM5K-8969 - <a href="https://dev.diamondkey.com/browse/OM5K-8969">https://dev.diamondkey.com/browse/OM5K-8969</a></p>
          <p>OM5K-8973 - <a href="https://dev.diamondkey.com/browse/OM5K-8973">https://dev.diamondkey.com/browse/OM5K-8973</a></p>
          <p>OM5K-9010 - <a href="https://dev.diamondkey.com/browse/OM5K-9010">https://dev.diamondkey.com/browse/OM5K-9010</a></p>
          <p>OM5K-9062 - <a href="https://dev.diamondkey.com/browse/OM5K-9062">https://dev.diamondkey.com/browse/OM5K-9062</a></p>
          <p>OM5K-9073 - <a href="https://dev.diamondkey.com/browse/OM5K-9073">https://dev.diamondkey.com/browse/OM5K-9073</a></p>
          <p>OM5K-9074 - <a href="https://dev.diamondkey.com/browse/OM5K-9074">https://dev.diamondkey.com/browse/OM5K-9074</a></p>
          <p>OM5K-9075 - <a href="https://dev.diamondkey.com/browse/OM5K-9075">https://dev.diamondkey.com/browse/OM5K-9075</a></p>
          <p>OM5K-9079 - <a href="https://dev.diamondkey.com/browse/OM5K-9079">https://dev.diamondkey.com/browse/OM5K-9079</a></p>
          <p>OM5K-9081 - <a href="https://dev.diamondkey.com/browse/OM5K-9081">https://dev.diamondkey.com/browse/OM5K-9081</a></p>
          <p>OM5K-9082 - <a href="https://dev.diamondkey.com/browse/OM5K-9082">https://dev.diamondkey.com/browse/OM5K-9082</a></p>
          <p>OM5K-9090 - <a href="https://dev.diamondkey.com/browse/OM5K-9090">https://dev.diamondkey.com/browse/OM5K-9090</a></p>
          <p>OM5K-9093 - <a href="https://dev.diamondkey.com/browse/OM5K-9093">https://dev.diamondkey.com/browse/OM5K-9093</a></p>
          <p>OM5K-9097 - <a href="https://dev.diamondkey.com/browse/OM5K-9097">https://dev.diamondkey.com/browse/OM5K-9097</a></p>
          <p>OM5K-7816 - <a href="https://dev.diamondkey.com/browse/OM5K-7816">https://dev.diamondkey.com/browse/OM5K-7816</a></p>
          <p>OM5K-7818 - <a href="https://dev.diamondkey.com/browse/OM5K-7818">https://dev.diamondkey.com/browse/OM5K-7818</a></p>
          <p>OM5K-7835 - <a href="https://dev.diamondkey.com/browse/OM5K-7835">https://dev.diamondkey.com/browse/OM5K-7835</a></p>
          <p>OM5K-8450 - <a href="https://dev.diamondkey.com/browse/OM5K-8450">https://dev.diamondkey.com/browse/OM5K-8450</a></p>
          <p>OM5K-8460 - <a href="https://dev.diamondkey.com/browse/OM5K-8460">https://dev.diamondkey.com/browse/OM5K-8460</a></p>
          <p>OM5K-8544 - <a href="https://dev.diamondkey.com/browse/OM5K-8544">https://dev.diamondkey.com/browse/OM5K-8544</a></p>
          <p>OM5K-8654 - <a href="https://dev.diamondkey.com/browse/OM5K-8654">https://dev.diamondkey.com/browse/OM5K-8654</a></p>
          <p>OM5K-8666 - <a href="https://dev.diamondkey.com/browse/OM5K-8666">https://dev.diamondkey.com/browse/OM5K-8666</a></p>
          <p>OM5K-8670 - <a href="https://dev.diamondkey.com/browse/OM5K-8670">https://dev.diamondkey.com/browse/OM5K-8670</a></p>
          <p>OM5K-8679 - <a href="https://dev.diamondkey.com/browse/OM5K-8679">https://dev.diamondkey.com/browse/OM5K-8679</a></p>
          <p>OM5K-8681 - <a href="https://dev.diamondkey.com/browse/OM5K-8681">https://dev.diamondkey.com/browse/OM5K-8681</a></p>
          <p>OM5K-8710 - <a href="https://dev.diamondkey.com/browse/OM5K-8710">https://dev.diamondkey.com/browse/OM5K-8710</a></p>
          <p>OM5K-8809 - <a href="https://dev.diamondkey.com/browse/OM5K-8809">https://dev.diamondkey.com/browse/OM5K-8809</a></p>
          <p>OM5K-8825 - <a href="https://dev.diamondkey.com/browse/OM5K-8825">https://dev.diamondkey.com/browse/OM5K-8825</a></p>
          <p>OM5K-8837 - <a href="https://dev.diamondkey.com/browse/OM5K-8837">https://dev.diamondkey.com/browse/OM5K-8837</a></p>
          <p>OM5K-8882 - <a href="https://dev.diamondkey.com/browse/OM5K-8882">https://dev.diamondkey.com/browse/OM5K-8882</a></p>
          <p>OM5K-8955 - <a href="https://dev.diamondkey.com/browse/OM5K-8955">https://dev.diamondkey.com/browse/OM5K-8955</a></p>
          <p>OM5K-8961 - <a href="https://dev.diamondkey.com/browse/OM5K-8961">https://dev.diamondkey.com/browse/OM5K-8961</a></p>
          <p>OM5K-8964 - <a href="https://dev.diamondkey.com/browse/OM5K-8964">https://dev.diamondkey.com/browse/OM5K-8964</a></p>
          <p>OM5K-8978 - <a href="https://dev.diamondkey.com/browse/OM5K-8978">https://dev.diamondkey.com/browse/OM5K-8978</a></p>
          <p>OM5K-8986 - <a href="https://dev.diamondkey.com/browse/OM5K-8986">https://dev.diamondkey.com/browse/OM5K-8986</a></p>
          <p>OM5K-9030 - <a href="https://dev.diamondkey.com/browse/OM5K-9030">https://dev.diamondkey.com/browse/OM5K-9030</a></p>
          <p>OM5K-7815 - <a href="https://dev.diamondkey.com/browse/OM5K-7815">https://dev.diamondkey.com/browse/OM5K-7815</a></p>
          <p>OM5K-8610 - <a href="https://dev.diamondkey.com/browse/OM5K-8610">https://dev.diamondkey.com/browse/OM5K-8610</a></p>
          <p>OM5K-8847 - <a href="https://dev.diamondkey.com/browse/OM5K-8847">https://dev.diamondkey.com/browse/OM5K-8847</a></p>
          <p>OM5K-9019 - <a href="https://dev.diamondkey.com/browse/OM5K-9019">https://dev.diamondkey.com/browse/OM5K-9019</a></p>
          <p>OM5K-8738 - <a href="https://dev.diamondkey.com/browse/OM5K-8738">https://dev.diamondkey.com/browse/OM5K-8738</a></p>
          <p>OM5K-8863 - <a href="https://dev.diamondkey.com/browse/OM5K-8863">https://dev.diamondkey.com/browse/OM5K-8863</a></p>
	      </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15d-rc.3) - 14/04/2021`,
    content: (
      <>
        <>
          <p>OM5K-8959 - <a href="https://dev.diamondkey.com/browse/OM5K-8959">https://dev.diamondkey.com/browse/OM5K-8959</a></p>
          <p>OM5K-8955 - <a href="https://dev.diamondkey.com/browse/OM5K-8955">https://dev.diamondkey.com/browse/OM5K-8955</a></p>
          <p>OM5K-8964 - <a href="https://dev.diamondkey.com/browse/OM5K-8964">https://dev.diamondkey.com/browse/OM5K-8964</a></p>
        </>
      </>
    ),
  },
    {
    title: `Release Notes (10.1.15d-rc.2) - 09/04/2021`,
    content: (
      <>
        <>
          <p>OM5K-8488 - <a href="https://dev.diamondkey.com/browse/OM5K-8488">https://dev.diamondkey.com/browse/OM5K-8488</a></p>
          <p>OM5K-8757 - <a href="https://dev.diamondkey.com/browse/OM5K-8757">https://dev.diamondkey.com/browse/OM5K-8757</a></p>
          <p>OM5K-8759 - <a href="https://dev.diamondkey.com/browse/OM5K-8759">https://dev.diamondkey.com/browse/OM5K-8759</a></p>
          <p>OM5K-8760 - <a href="https://dev.diamondkey.com/browse/OM5K-8760">https://dev.diamondkey.com/browse/OM5K-8760</a></p>
          <p>OM5K-8831 - <a href="https://dev.diamondkey.com/browse/OM5K-8831">https://dev.diamondkey.com/browse/OM5K-8831</a></p>
          <p>OM5K-8841 - <a href="https://dev.diamondkey.com/browse/OM5K-8841">https://dev.diamondkey.com/browse/OM5K-8841</a></p>
          <p>OM5K-8843 - <a href="https://dev.diamondkey.com/browse/OM5K-8843">https://dev.diamondkey.com/browse/OM5K-8843</a></p>
          <p>OM5K-8853 - <a href="https://dev.diamondkey.com/browse/OM5K-8853">https://dev.diamondkey.com/browse/OM5K-8853</a></p>
          <p>OM5K-8880 - <a href="https://dev.diamondkey.com/browse/OM5K-8880">https://dev.diamondkey.com/browse/OM5K-8880</a></p>
          <p>OM5K-8891 - <a href="https://dev.diamondkey.com/browse/OM5K-8891">https://dev.diamondkey.com/browse/OM5K-8891</a></p>
          <p>OM5K-8902 - <a href="https://dev.diamondkey.com/browse/OM5K-8902">https://dev.diamondkey.com/browse/OM5K-8902</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15d-rc.1) - 22/03/2021`,
    content: (
      <>
        <>
          <p>OM5K-8827 - <a href="https://dev.diamondkey.com/browse/OM5K-8827">https://dev.diamondkey.com/browse/OM5K-8827</a></p>
          <p>OM5K-8845 - <a href="https://dev.diamondkey.com/browse/OM5K-8845">https://dev.diamondkey.com/browse/OM5K-8845</a></p>
          <p>OM5K-8304 - <a href="https://dev.diamondkey.com/browse/OM5K-8304">https://dev.diamondkey.com/browse/OM5K-8304</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15c) - 22/03/2021`,
    content: (
      <>
        <>
          <p>OM5K-8747 - <a href="https://dev.diamondkey.com/browse/OM5K-8747">https://dev.diamondkey.com/browse/OM5K-8747</a></p>
          <p>OM5K-8748 - <a href="https://dev.diamondkey.com/browse/OM5K-8748">https://dev.diamondkey.com/browse/OM5K-8748</a></p>
          <p>OM5K-8733 - <a href="https://dev.diamondkey.com/browse/OM5K-8733">https://dev.diamondkey.com/browse/OM5K-8733</a></p>
          <p>OM5K-8751 - <a href="https://dev.diamondkey.com/browse/OM5K-8751">https://dev.diamondkey.com/browse/OM5K-8751</a></p>
          <p>OM5K-7071 - <a href="https://dev.diamondkey.com/browse/OM5K-7071">https://dev.diamondkey.com/browse/OM5K-7071</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15b) - 11/03/2021`,
    content: (
      <>
        <>
          <p>OM5K-8488 - <a href="https://dev.diamondkey.com/browse/OM5K-8488">https://dev.diamondkey.com/browse/OM5K-8488</a></p>
          <p>OM5K-5155 - <a href="https://dev.diamondkey.com/browse/OM5K-5155">https://dev.diamondkey.com/browse/OM5K-5155</a></p>
          <p>OM5K-8516 - <a href="https://dev.diamondkey.com/browse/OM5K-8516">https://dev.diamondkey.com/browse/OM5K-8516</a></p>
          <p>OM5K-8527 - <a href="https://dev.diamondkey.com/browse/OM5K-8527">https://dev.diamondkey.com/browse/OM5K-8527</a></p>
          <p>OM5K-8539 - <a href="https://dev.diamondkey.com/browse/OM5K-8539">https://dev.diamondkey.com/browse/OM5K-8539</a></p>
          <p>OM5K-8607 - <a href="https://dev.diamondkey.com/browse/OM5K-8607">https://dev.diamondkey.com/browse/OM5K-8607</a></p>
          <p>OM5K-8608 - <a href="https://dev.diamondkey.com/browse/OM5K-8608">https://dev.diamondkey.com/browse/OM5K-8608</a></p>
          <p>OM5K-8618 - <a href="https://dev.diamondkey.com/browse/OM5K-8618">https://dev.diamondkey.com/browse/OM5K-8618</a></p>
          <p>OM5K-8652 - <a href="https://dev.diamondkey.com/browse/OM5K-8652">https://dev.diamondkey.com/browse/OM5K-8652</a></p>
          <p>OM5K-8655 - <a href="https://dev.diamondkey.com/browse/OM5K-8655">https://dev.diamondkey.com/browse/OM5K-8655</a></p>
          <p>OM5K-8656 - <a href="https://dev.diamondkey.com/browse/OM5K-8656">https://dev.diamondkey.com/browse/OM5K-8656</a></p>
          <p>OM5K-8672 - <a href="https://dev.diamondkey.com/browse/OM5K-8672">https://dev.diamondkey.com/browse/OM5K-8672</a></p>
          <p>OM5K-8691 - <a href="https://dev.diamondkey.com/browse/OM5K-8691">https://dev.diamondkey.com/browse/OM5K-8691</a></p>
          <p>OM5K-8692 - <a href="https://dev.diamondkey.com/browse/OM5K-8692">https://dev.diamondkey.com/browse/OM5K-8692</a></p>
          <p>OM5K-8717 - <a href="https://dev.diamondkey.com/browse/OM5K-8717">https://dev.diamondkey.com/browse/OM5K-8717</a></p>
          <p>OM5K-8719 - <a href="https://dev.diamondkey.com/browse/OM5K-8719">https://dev.diamondkey.com/browse/OM5K-8719</a></p>
          <p>OM5K-8720 - <a href="https://dev.diamondkey.com/browse/OM5K-8720">https://dev.diamondkey.com/browse/OM5K-8720</a></p>
          <p>OM5K-7830 - <a href="https://dev.diamondkey.com/browse/OM5K-7830">https://dev.diamondkey.com/browse/OM5K-7830</a></p>
          <p>OM5K-8508 - <a href="https://dev.diamondkey.com/browse/OM5K-8508">https://dev.diamondkey.com/browse/OM5K-8508</a></p>
          <p>OM5K-8526 - <a href="https://dev.diamondkey.com/browse/OM5K-8526">https://dev.diamondkey.com/browse/OM5K-8526</a></p>
          <p>OM5K-8547 - <a href="https://dev.diamondkey.com/browse/OM5K-8547">https://dev.diamondkey.com/browse/OM5K-8547</a></p>
          <p>OM5K-8572 - <a href="https://dev.diamondkey.com/browse/OM5K-8572">https://dev.diamondkey.com/browse/OM5K-8572</a></p>
          <p>OM5K-8573 - <a href="https://dev.diamondkey.com/browse/OM5K-8573">https://dev.diamondkey.com/browse/OM5K-8573</a></p>
          <p>OM5K-8668 - <a href="https://dev.diamondkey.com/browse/OM5K-8668">https://dev.diamondkey.com/browse/OM5K-8668</a></p>
          <p>OM5K-8677 - <a href="https://dev.diamondkey.com/browse/OM5K-8677">https://dev.diamondkey.com/browse/OM5K-8677</a></p>
          <p>OM5K-8680 - <a href="https://dev.diamondkey.com/browse/OM5K-8680">https://dev.diamondkey.com/browse/OM5K-8680</a></p>
          <p>OM5K-8682 - <a href="https://dev.diamondkey.com/browse/OM5K-8682">https://dev.diamondkey.com/browse/OM5K-8682</a></p>
          <p>OM5K-8713 - <a href="https://dev.diamondkey.com/browse/OM5K-8713">https://dev.diamondkey.com/browse/OM5K-8713</a></p>
          <p>OM5K-8570 - <a href="https://dev.diamondkey.com/browse/OM5K-8570">https://dev.diamondkey.com/browse/OM5K-8570</a></p>
          <p>OM5K-8571 - <a href="https://dev.diamondkey.com/browse/OM5K-8571">https://dev.diamondkey.com/browse/OM5K-8571</a></p>
          <p>OM5K-8617 - <a href="https://dev.diamondkey.com/browse/OM5K-8617">https://dev.diamondkey.com/browse/OM5K-8617</a></p>
          <p>OM5K-8678 - <a href="https://dev.diamondkey.com/browse/OM5K-8678">https://dev.diamondkey.com/browse/OM5K-8678</a></p>
          <p>OM5K-8687 - <a href="https://dev.diamondkey.com/browse/OM5K-8687">https://dev.diamondkey.com/browse/OM5K-8687</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15a) - 05/02/2021`,
    content: (
      <>
        <>
          <p>OM5K-8518 - <a href="https://dev.diamondkey.com/browse/OM5K-8518">https://dev.diamondkey.com/browse/OM5K-8518</a></p>
          <p>OM5K-8525 - <a href="https://dev.diamondkey.com/browse/OM5K-8525">https://dev.diamondkey.com/browse/OM5K-8525</a></p>
          <p>OM5K-8379 - <a href="https://dev.diamondkey.com/browse/OM5K-8379">https://dev.diamondkey.com/browse/OM5K-8379</a></p>
          <p>OM5K-8510 - <a href="https://dev.diamondkey.com/browse/OM5K-8510">https://dev.diamondkey.com/browse/OM5K-8510</a></p>
          <p>OM5K-8523 - <a href="https://dev.diamondkey.com/browse/OM5K-8523">https://dev.diamondkey.com/browse/OM5K-8523</a></p>
          <p>OM5K-8428 - <a href="https://dev.diamondkey.com/browse/OM5K-8428">https://dev.diamondkey.com/browse/OM5K-8428</a></p>
          <p>OM5K-8455 - <a href="https://dev.diamondkey.com/browse/OM5K-8455">https://dev.diamondkey.com/browse/OM5K-8455</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.15) - 29/01/2021`,
    content: (
      <>
        <>
          <p>OM5K-8313 - <a href="https://dev.diamondkey.com/browse/OM5K-8313">https://dev.diamondkey.com/browse/OM5K-8313</a></p>
          <p>OM5K-8415 - <a href="https://dev.diamondkey.com/browse/OM5K-8415">https://dev.diamondkey.com/browse/OM5K-8415</a></p>
          <p>OM5K-8416 - <a href="https://dev.diamondkey.com/browse/OM5K-8416">https://dev.diamondkey.com/browse/OM5K-8416</a></p>
          <p>OM5K-8420 - <a href="https://dev.diamondkey.com/browse/OM5K-8420">https://dev.diamondkey.com/browse/OM5K-8420</a></p>
          <p>OM5K-8426 - <a href="https://dev.diamondkey.com/browse/OM5K-8426">https://dev.diamondkey.com/browse/OM5K-8426</a></p>
          <p>OM5K-8444 - <a href="https://dev.diamondkey.com/browse/OM5K-8444">https://dev.diamondkey.com/browse/OM5K-8444</a></p>
          <p>OM5K-8472 - <a href="https://dev.diamondkey.com/browse/OM5K-8472">https://dev.diamondkey.com/browse/OM5K-8472</a></p>
          <p>OM5K-8490 - <a href="https://dev.diamondkey.com/browse/OM5K-8490">https://dev.diamondkey.com/browse/OM5K-8490</a></p>
          <p>OM5K-8494 - <a href="https://dev.diamondkey.com/browse/OM5K-8494">https://dev.diamondkey.com/browse/OM5K-8494</a></p>
          <p>OM5K-8506 - <a href="https://dev.diamondkey.com/browse/OM5K-8506">https://dev.diamondkey.com/browse/OM5K-8506</a></p>
          <p>OM5K-8095 - <a href="https://dev.diamondkey.com/browse/OM5K-8095">https://dev.diamondkey.com/browse/OM5K-8095</a></p>
          <p>OM5K-8355 - <a href="https://dev.diamondkey.com/browse/OM5K-8355">https://dev.diamondkey.com/browse/OM5K-8355</a></p>
          <p>OM5K-8357 - <a href="https://dev.diamondkey.com/browse/OM5K-8357">https://dev.diamondkey.com/browse/OM5K-8357</a></p>
          <p>OM5K-8358 - <a href="https://dev.diamondkey.com/browse/OM5K-8358">https://dev.diamondkey.com/browse/OM5K-8358</a></p>
          <p>OM5K-8401 - <a href="https://dev.diamondkey.com/browse/OM5K-8401">https://dev.diamondkey.com/browse/OM5K-8401</a></p>
          <p>OM5K-8402 - <a href="https://dev.diamondkey.com/browse/OM5K-8402">https://dev.diamondkey.com/browse/OM5K-8402</a></p>
          <p>OM5K-8406 - <a href="https://dev.diamondkey.com/browse/OM5K-8406">https://dev.diamondkey.com/browse/OM5K-8406</a></p>
          <p>OM5K-8410 - <a href="https://dev.diamondkey.com/browse/OM5K-8410">https://dev.diamondkey.com/browse/OM5K-8410</a></p>
          <p>OM5K-8412 - <a href="https://dev.diamondkey.com/browse/OM5K-8412">https://dev.diamondkey.com/browse/OM5K-8412</a></p>
          <p>OM5K-8414 - <a href="https://dev.diamondkey.com/browse/OM5K-8414">https://dev.diamondkey.com/browse/OM5K-8414</a></p>
          <p>OM5K-8417 - <a href="https://dev.diamondkey.com/browse/OM5K-8417">https://dev.diamondkey.com/browse/OM5K-8417</a></p>
          <p>OM5K-8429 - <a href="https://dev.diamondkey.com/browse/OM5K-8429">https://dev.diamondkey.com/browse/OM5K-8429</a></p>
          <p>OM5K-8430 - <a href="https://dev.diamondkey.com/browse/OM5K-8430">https://dev.diamondkey.com/browse/OM5K-8430</a></p>
          <p>OM5K-8438 - <a href="https://dev.diamondkey.com/browse/OM5K-8438">https://dev.diamondkey.com/browse/OM5K-8438</a></p>
          <p>OM5K-8454 - <a href="https://dev.diamondkey.com/browse/OM5K-8454">https://dev.diamondkey.com/browse/OM5K-8454</a></p>
          <p>OM5K-8495 - <a href="https://dev.diamondkey.com/browse/OM5K-8495">https://dev.diamondkey.com/browse/OM5K-8495</a></p>
          <p>OM5K-8501 - <a href="https://dev.diamondkey.com/browse/OM5K-8501">https://dev.diamondkey.com/browse/OM5K-8501</a></p>
          <p>OM5K-7883 - <a href="https://dev.diamondkey.com/browse/OM5K-7883">https://dev.diamondkey.com/browse/OM5K-7883</a></p>
          <p>OM5K-8096 - <a href="https://dev.diamondkey.com/browse/OM5K-8096">https://dev.diamondkey.com/browse/OM5K-8096</a></p>
          <p>OM5K-8206 - <a href="https://dev.diamondkey.com/browse/OM5K-8206">https://dev.diamondkey.com/browse/OM5K-8206</a></p>
          <p>OM5K-8342 - <a href="https://dev.diamondkey.com/browse/OM5K-8342">https://dev.diamondkey.com/browse/OM5K-8342</a></p>
          <p>OM5K-8366 - <a href="https://dev.diamondkey.com/browse/OM5K-8366">https://dev.diamondkey.com/browse/OM5K-8366</a></p>
          <p>OM5K-8437 - <a href="https://dev.diamondkey.com/browse/OM5K-8437">https://dev.diamondkey.com/browse/OM5K-8437</a></p>
          <p>OM5K-8489 - <a href="https://dev.diamondkey.com/browse/OM5K-8489">https://dev.diamondkey.com/browse/OM5K-8489</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.14b) - 11/12/2020`,
    content: (
      <>
        <>
          <p>OM5K-8420 - <a href="https://dev.diamondkey.com/browse/OM5K-8420">https://dev.diamondkey.com/browse/OM5K-8420</a></p>
          <p>OM5K-8410 - <a href="https://dev.diamondkey.com/browse/OM5K-8410">https://dev.diamondkey.com/browse/OM5K-8410</a></p>
          <p>OM5K-8313 - <a href="https://dev.diamondkey.com/browse/OM5K-8313">https://dev.diamondkey.com/browse/OM5K-8313</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.14a) - 11/12/2020`,
    content: (
      <>
        <>
          <p>OM5K-8398 - <a href="https://dev.diamondkey.com/browse/OM5K-8398">https://dev.diamondkey.com/browse/OM5K-8398</a></p>
          <p>OM5K-8122 - <a href="https://dev.diamondkey.com/browse/OM5K-8122">https://dev.diamondkey.com/browse/OM5K-8122</a></p>
          <p>OM5K-8234 - <a href="https://dev.diamondkey.com/browse/OM5K-8234">https://dev.diamondkey.com/browse/OM5K-8234</a></p>
          <p>OM5K-8236 - <a href="https://dev.diamondkey.com/browse/OM5K-8236">https://dev.diamondkey.com/browse/OM5K-8236</a></p>
          <p>OM5K-8241 - <a href="https://dev.diamondkey.com/browse/OM5K-8241">https://dev.diamondkey.com/browse/OM5K-8241</a></p>
          <p>OM5K-8242 - <a href="https://dev.diamondkey.com/browse/OM5K-8242">https://dev.diamondkey.com/browse/OM5K-8242</a></p>
          <p>OM5K-8243 - <a href="https://dev.diamondkey.com/browse/OM5K-8243">https://dev.diamondkey.com/browse/OM5K-8243</a></p>
          <p>OM5K-8250 - <a href="https://dev.diamondkey.com/browse/OM5K-8250">https://dev.diamondkey.com/browse/OM5K-8250</a></p>
          <p>OM5K-8251 - <a href="https://dev.diamondkey.com/browse/OM5K-8251">https://dev.diamondkey.com/browse/OM5K-8251</a></p>
          <p>OM5K-8254 - <a href="https://dev.diamondkey.com/browse/OM5K-8254">https://dev.diamondkey.com/browse/OM5K-8254</a></p>
          <p>OM5K-8281 - <a href="https://dev.diamondkey.com/browse/OM5K-8281">https://dev.diamondkey.com/browse/OM5K-8281</a></p>
          <p>OM5K-8309 - <a href="https://dev.diamondkey.com/browse/OM5K-8309">https://dev.diamondkey.com/browse/OM5K-8309</a></p>
          <p>OM5K-8310 - <a href="https://dev.diamondkey.com/browse/OM5K-8310">https://dev.diamondkey.com/browse/OM5K-8310</a></p>
          <p>OM5K-8313 - <a href="https://dev.diamondkey.com/browse/OM5K-8313">https://dev.diamondkey.com/browse/OM5K-8313</a></p>
          <p>OM5K-8349 - <a href="https://dev.diamondkey.com/browse/OM5K-8349">https://dev.diamondkey.com/browse/OM5K-8349</a></p>
          <p>OM5K-8363 - <a href="https://dev.diamondkey.com/browse/OM5K-8363">https://dev.diamondkey.com/browse/OM5K-8363</a></p>
          <p>OM5K-8382 - <a href="https://dev.diamondkey.com/browse/OM5K-8382">https://dev.diamondkey.com/browse/OM5K-8382</a></p>
          <p>OM5K-7804 - <a href="https://dev.diamondkey.com/browse/OM5K-7804">https://dev.diamondkey.com/browse/OM5K-7804</a></p>
          <p>OM5K-7829 - <a href="https://dev.diamondkey.com/browse/OM5K-7829">https://dev.diamondkey.com/browse/OM5K-7829</a></p>
          <p>OM5K-7965 - <a href="https://dev.diamondkey.com/browse/OM5K-7965">https://dev.diamondkey.com/browse/OM5K-7965</a></p>
          <p>OM5K-8095 - <a href="https://dev.diamondkey.com/browse/OM5K-8095">https://dev.diamondkey.com/browse/OM5K-8095</a></p>
          <p>OM5K-8110 - <a href="https://dev.diamondkey.com/browse/OM5K-8110">https://dev.diamondkey.com/browse/OM5K-8110</a></p>
          <p>OM5K-8111 - <a href="https://dev.diamondkey.com/browse/OM5K-8111">https://dev.diamondkey.com/browse/OM5K-8111</a></p>
          <p>OM5K-8213 - <a href="https://dev.diamondkey.com/browse/OM5K-8213">https://dev.diamondkey.com/browse/OM5K-8213</a></p>
          <p>OM5K-8239 - <a href="https://dev.diamondkey.com/browse/OM5K-8239">https://dev.diamondkey.com/browse/OM5K-8239</a></p>
          <p>OM5K-8240 - <a href="https://dev.diamondkey.com/browse/OM5K-8240">https://dev.diamondkey.com/browse/OM5K-8240</a></p>
          <p>OM5K-8252 - <a href="https://dev.diamondkey.com/browse/OM5K-8252">https://dev.diamondkey.com/browse/OM5K-8252</a></p>
          <p>OM5K-8256 - <a href="https://dev.diamondkey.com/browse/OM5K-8256">https://dev.diamondkey.com/browse/OM5K-8256</a></p>
          <p>OM5K-8257 - <a href="https://dev.diamondkey.com/browse/OM5K-8257">https://dev.diamondkey.com/browse/OM5K-8257</a></p>
          <p>OM5K-8280 - <a href="https://dev.diamondkey.com/browse/OM5K-8280">https://dev.diamondkey.com/browse/OM5K-8280</a></p>
          <p>OM5K-8306 - <a href="https://dev.diamondkey.com/browse/OM5K-8306">https://dev.diamondkey.com/browse/OM5K-8306</a></p>
          <p>OM5K-8307 - <a href="https://dev.diamondkey.com/browse/OM5K-8307">https://dev.diamondkey.com/browse/OM5K-8307</a></p>
          <p>OM5K-8314 - <a href="https://dev.diamondkey.com/browse/OM5K-8314">https://dev.diamondkey.com/browse/OM5K-8314</a></p>
          <p>OM5K-8326 - <a href="https://dev.diamondkey.com/browse/OM5K-8326">https://dev.diamondkey.com/browse/OM5K-8326</a></p>
          <p>OM5K-8331 - <a href="https://dev.diamondkey.com/browse/OM5K-8331">https://dev.diamondkey.com/browse/OM5K-8331</a></p>
          <p>OM5K-8332 - <a href="https://dev.diamondkey.com/browse/OM5K-8332">https://dev.diamondkey.com/browse/OM5K-8332</a></p>
          <p>OM5K-8333 - <a href="https://dev.diamondkey.com/browse/OM5K-8333">https://dev.diamondkey.com/browse/OM5K-8333</a></p>
          <p>OM5K-8334 - <a href="https://dev.diamondkey.com/browse/OM5K-8334">https://dev.diamondkey.com/browse/OM5K-8334</a></p>
          <p>OM5K-8335 - <a href="https://dev.diamondkey.com/browse/OM5K-8335">https://dev.diamondkey.com/browse/OM5K-8335</a></p>
          <p>OM5K-8336 - <a href="https://dev.diamondkey.com/browse/OM5K-8336">https://dev.diamondkey.com/browse/OM5K-8336</a></p>
          <p>OM5K-8356 - <a href="https://dev.diamondkey.com/browse/OM5K-8356">https://dev.diamondkey.com/browse/OM5K-8356</a></p>
          <p>OM5K-8361 - <a href="https://dev.diamondkey.com/browse/OM5K-8361">https://dev.diamondkey.com/browse/OM5K-8361</a></p>
          <p>OM5K-8377 - <a href="https://dev.diamondkey.com/browse/OM5K-8377">https://dev.diamondkey.com/browse/OM5K-8377</a></p>
          <p>OM5K-8087 - <a href="https://dev.diamondkey.com/browse/OM5K-8087">https://dev.diamondkey.com/browse/OM5K-8087</a></p>
          <p>OM5K-8088 - <a href="https://dev.diamondkey.com/browse/OM5K-8088">https://dev.diamondkey.com/browse/OM5K-8088</a></p>
          <p>OM5K-8130 - <a href="https://dev.diamondkey.com/browse/OM5K-8130">https://dev.diamondkey.com/browse/OM5K-8130</a></p>
          <p>OM5K-8160 - <a href="https://dev.diamondkey.com/browse/OM5K-8160">https://dev.diamondkey.com/browse/OM5K-8160</a></p>
          <p>OM5K-8165 - <a href="https://dev.diamondkey.com/browse/OM5K-8165">https://dev.diamondkey.com/browse/OM5K-8165</a></p>
          <p>OM5K-8184 - <a href="https://dev.diamondkey.com/browse/OM5K-8184">https://dev.diamondkey.com/browse/OM5K-8184</a></p>
          <p>OM5K-8185 - <a href="https://dev.diamondkey.com/browse/OM5K-8185">https://dev.diamondkey.com/browse/OM5K-8185</a></p>
          <p>OM5K-8350 - <a href="https://dev.diamondkey.com/browse/OM5K-8350">https://dev.diamondkey.com/browse/OM5K-8350</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.13) - 13/11/2020`,
    content: (
      <>
        <>
          <p>OM5K-8170 - <a href="https://dev.diamondkey.com/browse/OM5K-8170">https://dev.diamondkey.com/browse/OM5K-8170</a></p>
          <p>OM5K-8229 - <a href="https://dev.diamondkey.com/browse/OM5K-8229">https://dev.diamondkey.com/browse/OM5K-8229</a></p>
          <p>OM5K-8194 - <a href="https://dev.diamondkey.com/browse/OM5K-8194">https://dev.diamondkey.com/browse/OM5K-8194</a></p>
          <p>OM5K-8003 - <a href="https://dev.diamondkey.com/browse/OM5K-8003">https://dev.diamondkey.com/browse/OM5K-8003</a></p>
          <p>OM5K-8085 - <a href="https://dev.diamondkey.com/browse/OM5K-8085">https://dev.diamondkey.com/browse/OM5K-8085</a></p>
          <p>OM5K-8096 - <a href="https://dev.diamondkey.com/browse/OM5K-8096">https://dev.diamondkey.com/browse/OM5K-8096</a></p>
          <p>OM5K-8097 - <a href="https://dev.diamondkey.com/browse/OM5K-8097">https://dev.diamondkey.com/browse/OM5K-8097</a></p>
          <p>OM5K-8182 - <a href="https://dev.diamondkey.com/browse/OM5K-8182">https://dev.diamondkey.com/browse/OM5K-8182</a></p>
          <p>OM5K-8205 - <a href="https://dev.diamondkey.com/browse/OM5K-8205">https://dev.diamondkey.com/browse/OM5K-8205</a></p>
          <p>OM5K-8206 - <a href="https://dev.diamondkey.com/browse/OM5K-8206">https://dev.diamondkey.com/browse/OM5K-8206</a></p>
          <p>OM5K-8215 - <a href="https://dev.diamondkey.com/browse/OM5K-8215">https://dev.diamondkey.com/browse/OM5K-8215</a></p>
          <p>OM5K-8180 - <a href="https://dev.diamondkey.com/browse/OM5K-8180">https://dev.diamondkey.com/browse/OM5K-8180</a></p>
          <p>OM5K-8181 - <a href="https://dev.diamondkey.com/browse/OM5K-8181">https://dev.diamondkey.com/browse/OM5K-8181</a></p>
          <p>OM5K-8157 - <a href="https://dev.diamondkey.com/browse/OM5K-8157">https://dev.diamondkey.com/browse/OM5K-8157</a></p>
          <p>OM5K-8166 - <a href="https://dev.diamondkey.com/browse/OM5K-8166">https://dev.diamondkey.com/browse/OM5K-8166</a></p>
          <p>OM5K-8077 - <a href="https://dev.diamondkey.com/browse/OM5K-8077">https://dev.diamondkey.com/browse/OM5K-8077</a></p>
          <p>OM5K-8092 - <a href="https://dev.diamondkey.com/browse/OM5K-8092">https://dev.diamondkey.com/browse/OM5K-8092</a></p>
          <p>OM5K-8127 - <a href="https://dev.diamondkey.com/browse/OM5K-8127">https://dev.diamondkey.com/browse/OM5K-8127</a></p>
          <p>OM5K-8164 - <a href="https://dev.diamondkey.com/browse/OM5K-8164">https://dev.diamondkey.com/browse/OM5K-8164</a></p>
          <p>OM5K-8169 - <a href="https://dev.diamondkey.com/browse/OM5K-8169">https://dev.diamondkey.com/browse/OM5K-8169</a></p>
          <p>OM5K-8171 - <a href="https://dev.diamondkey.com/browse/OM5K-8171">https://dev.diamondkey.com/browse/OM5K-8171</a></p>
          <p>OM5K-8172 - <a href="https://dev.diamondkey.com/browse/OM5K-8172">https://dev.diamondkey.com/browse/OM5K-8172</a></p>
          <p>OM5K-8173 - <a href="https://dev.diamondkey.com/browse/OM5K-8173">https://dev.diamondkey.com/browse/OM5K-8173</a></p>
          <p>OM5K-8174 - <a href="https://dev.diamondkey.com/browse/OM5K-8174">https://dev.diamondkey.com/browse/OM5K-8174</a></p>
          <p>OM5K-8187 - <a href="https://dev.diamondkey.com/browse/OM5K-8187">https://dev.diamondkey.com/browse/OM5K-8187</a></p>
          <p>OM5K-8200 - <a href="https://dev.diamondkey.com/browse/OM5K-8200">https://dev.diamondkey.com/browse/OM5K-8200</a></p>
          <p>OM5K-8202 - <a href="https://dev.diamondkey.com/browse/OM5K-8202">https://dev.diamondkey.com/browse/OM5K-8202</a></p>
          <p>OM5K-7898 - <a href="https://dev.diamondkey.com/browse/OM5K-7898">https://dev.diamondkey.com/browse/OM5K-7898</a></p>
          <p>OM5K-7959 - <a href="https://dev.diamondkey.com/browse/OM5K-7959">https://dev.diamondkey.com/browse/OM5K-7959</a></p>
          <p>OM5K-8051 - <a href="https://dev.diamondkey.com/browse/OM5K-8051">https://dev.diamondkey.com/browse/OM5K-8051</a></p>
          <p>OM5K-8071 - <a href="https://dev.diamondkey.com/browse/OM5K-8071">https://dev.diamondkey.com/browse/OM5K-8071</a></p>
          <p>OM5K-8091 - <a href="https://dev.diamondkey.com/browse/OM5K-8091">https://dev.diamondkey.com/browse/OM5K-8091</a></p>
          <p>OM5K-8106 - <a href="https://dev.diamondkey.com/browse/OM5K-8106">https://dev.diamondkey.com/browse/OM5K-8106</a></p>
          <p>OM5K-8107 - <a href="https://dev.diamondkey.com/browse/OM5K-8107">https://dev.diamondkey.com/browse/OM5K-8107</a></p>
          <p>OM5K-8117 - <a href="https://dev.diamondkey.com/browse/OM5K-8117">https://dev.diamondkey.com/browse/OM5K-8117</a></p>
          <p>OM5K-8119 - <a href="https://dev.diamondkey.com/browse/OM5K-8119">https://dev.diamondkey.com/browse/OM5K-8119</a></p>
          <p>OM5K-8123 - <a href="https://dev.diamondkey.com/browse/OM5K-8123">https://dev.diamondkey.com/browse/OM5K-8123</a></p>
          <p>OM5K-8128 - <a href="https://dev.diamondkey.com/browse/OM5K-8128">https://dev.diamondkey.com/browse/OM5K-8128</a></p>
          <p>OM5K-8135 - <a href="https://dev.diamondkey.com/browse/OM5K-8135">https://dev.diamondkey.com/browse/OM5K-8135</a></p>
          <p>OM5K-8136 - <a href="https://dev.diamondkey.com/browse/OM5K-8136">https://dev.diamondkey.com/browse/OM5K-8136</a></p>
          <p>OM5K-8159 - <a href="https://dev.diamondkey.com/browse/OM5K-8159">https://dev.diamondkey.com/browse/OM5K-8159</a></p>
          <p>OM5K-8162 - <a href="https://dev.diamondkey.com/browse/OM5K-8162">https://dev.diamondkey.com/browse/OM5K-8162</a></p>
          <p>OM5K-8163 - <a href="https://dev.diamondkey.com/browse/OM5K-8163">https://dev.diamondkey.com/browse/OM5K-8163</a></p>
          <p>OM5K-8203 - <a href="https://dev.diamondkey.com/browse/OM5K-8203">https://dev.diamondkey.com/browse/OM5K-8203</a></p>
          <p>OM5K-7423 - <a href="https://dev.diamondkey.com/browse/OM5K-7423">https://dev.diamondkey.com/browse/OM5K-7423</a></p>
          <p>OM5K-7983 - <a href="https://dev.diamondkey.com/browse/OM5K-7983">https://dev.diamondkey.com/browse/OM5K-7983</a></p>
          <p>OM5K-8081 - <a href="https://dev.diamondkey.com/browse/OM5K-8081">https://dev.diamondkey.com/browse/OM5K-8081</a></p>
          <p>OM5K-8089 - <a href="https://dev.diamondkey.com/browse/OM5K-8089">https://dev.diamondkey.com/browse/OM5K-8089</a></p>
          <p>OM5K-8094 - <a href="https://dev.diamondkey.com/browse/OM5K-8094">https://dev.diamondkey.com/browse/OM5K-8094</a></p>
          <p>OM5K-8112 - <a href="https://dev.diamondkey.com/browse/OM5K-8112">https://dev.diamondkey.com/browse/OM5K-8112</a></p>
          <p>OM5K-8116 - <a href="https://dev.diamondkey.com/browse/OM5K-8116">https://dev.diamondkey.com/browse/OM5K-8116</a></p>
          <p>OM5K-8118 - <a href="https://dev.diamondkey.com/browse/OM5K-8118">https://dev.diamondkey.com/browse/OM5K-8118</a></p>
          <p>OM5K-8168 - <a href="https://dev.diamondkey.com/browse/OM5K-8168">https://dev.diamondkey.com/browse/OM5K-8168</a></p>
          <p>OM5K-8176 - <a href="https://dev.diamondkey.com/browse/OM5K-8176">https://dev.diamondkey.com/browse/OM5K-8176</a></p>
          <p>OM5K-8177 - <a href="https://dev.diamondkey.com/browse/OM5K-8177">https://dev.diamondkey.com/browse/OM5K-8177</a></p>
        </>
      </>
    ),
  },{
    title: `Release Notes (10.1.12b) - 06/11/2020`,
    content: (
      <>
        <>
          <p>OM5K-8200 - <a href="https://dev.diamondkey.com/browse/OM5K-8200">https://dev.diamondkey.com/browse/OM5K-8200</a></p>
          <p>OM5K-8202 - <a href="https://dev.diamondkey.com/browse/OM5K-8202">https://dev.diamondkey.com/browse/OM5K-8202</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.12a) - 05/11/2020`,
    content: (
      <>
        <>
          <p>OM5K-8166 - <a href="https://dev.diamondkey.com/browse/OM5K-8166">https://dev.diamondkey.com/browse/OM5K-8166</a></p>
          <p>OM5K-8077 - <a href="https://dev.diamondkey.com/browse/OM5K-8077">https://dev.diamondkey.com/browse/OM5K-8077</a></p>
          <p>OM5K-8174 - <a href="https://dev.diamondkey.com/browse/OM5K-8174">https://dev.diamondkey.com/browse/OM5K-8174</a></p>
          <p>OM5K-8162 - <a href="https://dev.diamondkey.com/browse/OM5K-8162">https://dev.diamondkey.com/browse/OM5K-8162</a></p>
          <p>OM5K-8163 - <a href="https://dev.diamondkey.com/browse/OM5K-8163">https://dev.diamondkey.com/browse/OM5K-8163</a></p>
          <p>OM5K-8187 - <a href="https://dev.diamondkey.com/browse/OM5K-8187">https://dev.diamondkey.com/browse/OM5K-8187</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.12) - 28/10/2020`,
    content: (
      <>
        <>
          <p>OM5K-8121 - <a href="https://dev.diamondkey.com/browse/OM5K-8121">https://dev.diamondkey.com/browse/OM5K-8121</a></p>
          <p>OM5K-8122 - <a href="https://dev.diamondkey.com/browse/OM5K-8122">https://dev.diamondkey.com/browse/OM5K-8122</a></p>
          <p>OM5K-8099 - <a href="https://dev.diamondkey.com/browse/OM5K-8099">https://dev.diamondkey.com/browse/OM5K-8099</a></p>
          <p>OM5K-8100 - <a href="https://dev.diamondkey.com/browse/OM5K-8100">https://dev.diamondkey.com/browse/OM5K-8100</a></p>
          <p>OM5K-8121 - <a href="https://dev.diamondkey.com/browse/OM5K-8121">https://dev.diamondkey.com/browse/OM5K-8121</a></p>
          <p>OM5K-8122 - <a href="https://dev.diamondkey.com/browse/OM5K-8122">https://dev.diamondkey.com/browse/OM5K-8122</a></p>
          <p>OM5K-8129 - <a href="https://dev.diamondkey.com/browse/OM5K-8129">https://dev.diamondkey.com/browse/OM5K-8129</a></p>
          <p>OM5K-7530 - <a href="https://dev.diamondkey.com/browse/OM5K-7530">https://dev.diamondkey.com/browse/OM5K-7530</a></p>
          <p>OM5K-7658 - <a href="https://dev.diamondkey.com/browse/OM5K-7658">https://dev.diamondkey.com/browse/OM5K-7658</a></p>
          <p>OM5K-8108 - <a href="https://dev.diamondkey.com/browse/OM5K-8108">https://dev.diamondkey.com/browse/OM5K-8108</a></p>
          <p>OM5K-8123 - <a href="https://dev.diamondkey.com/browse/OM5K-8123">https://dev.diamondkey.com/browse/OM5K-8123</a></p>
          <p>OM5K-8077 - <a href="https://dev.diamondkey.com/browse/OM5K-8077">https://dev.diamondkey.com/browse/OM5K-8077</a></p>
          <p>OM5K-8092 - <a href="https://dev.diamondkey.com/browse/OM5K-8092">https://dev.diamondkey.com/browse/OM5K-8092</a></p>
          <p>OM5K-8093 - <a href="https://dev.diamondkey.com/browse/OM5K-8093">https://dev.diamondkey.com/browse/OM5K-8093</a></p>
          <p>OM5K-7660 - <a href="https://dev.diamondkey.com/browse/OM5K-7660">https://dev.diamondkey.com/browse/OM5K-7660</a></p>
          <p>OM5K-7888 - <a href="https://dev.diamondkey.com/browse/OM5K-7888">https://dev.diamondkey.com/browse/OM5K-7888</a></p>
          <p>OM5K-7898 - <a href="https://dev.diamondkey.com/browse/OM5K-7898">https://dev.diamondkey.com/browse/OM5K-7898</a></p>
          <p>OM5K-7979 - <a href="https://dev.diamondkey.com/browse/OM5K-7979">https://dev.diamondkey.com/browse/OM5K-7979</a></p>
          <p>OM5K-7980 - <a href="https://dev.diamondkey.com/browse/OM5K-7980">https://dev.diamondkey.com/browse/OM5K-7980</a></p>
          <p>OM5K-8002 - <a href="https://dev.diamondkey.com/browse/OM5K-8002">https://dev.diamondkey.com/browse/OM5K-8002</a></p>
          <p>OM5K-8074 - <a href="https://dev.diamondkey.com/browse/OM5K-8074">https://dev.diamondkey.com/browse/OM5K-8074</a></p>
          <p>OM5K-8075 - <a href="https://dev.diamondkey.com/browse/OM5K-8075">https://dev.diamondkey.com/browse/OM5K-8075</a></p>
          <p>OM5K-8098 - <a href="https://dev.diamondkey.com/browse/OM5K-8098">https://dev.diamondkey.com/browse/OM5K-8098</a></p>
          <p>OM5K-7911 - <a href="https://dev.diamondkey.com/browse/OM5K-7911">https://dev.diamondkey.com/browse/OM5K-7911</a></p>
          <p>OM5K-7920 - <a href="https://dev.diamondkey.com/browse/OM5K-7920">https://dev.diamondkey.com/browse/OM5K-7920</a></p>
          <p>OM5K-7946 - <a href="https://dev.diamondkey.com/browse/OM5K-7946">https://dev.diamondkey.com/browse/OM5K-7946</a></p>
          <p>OM5K-7984 - <a href="https://dev.diamondkey.com/browse/OM5K-7984">https://dev.diamondkey.com/browse/OM5K-7984</a></p>
          <p>OM5K-8016 - <a href="https://dev.diamondkey.com/browse/OM5K-8016">https://dev.diamondkey.com/browse/OM5K-8016</a></p>
          <p>OM5K-8072 - <a href="https://dev.diamondkey.com/browse/OM5K-8072">https://dev.diamondkey.com/browse/OM5K-8072</a></p>
          <p>OM5K-7863 - <a href="https://dev.diamondkey.com/browse/OM5K-7863">https://dev.diamondkey.com/browse/OM5K-7863</a></p>
          <p>OM5K-7952 - <a href="https://dev.diamondkey.com/browse/OM5K-7952">https://dev.diamondkey.com/browse/OM5K-7952</a></p>
          <p>OM5K-8066 - <a href="https://dev.diamondkey.com/browse/OM5K-8066">https://dev.diamondkey.com/browse/OM5K-8066</a></p>
          <p>OM5K-8068 - <a href="https://dev.diamondkey.com/browse/OM5K-8068">https://dev.diamondkey.com/browse/OM5K-8068</a></p>
          <p>OM5K-8069 - <a href="https://dev.diamondkey.com/browse/OM5K-8069">https://dev.diamondkey.com/browse/OM5K-8069</a></p>
          <p>OM5K-6544 - <a href="https://dev.diamondkey.com/browse/OM5K-6544">https://dev.diamondkey.com/browse/OM5K-6544</a></p>
          <p>OM5K-7898 - <a href="https://dev.diamondkey.com/browse/OM5K-7898">https://dev.diamondkey.com/browse/OM5K-7898</a></p>
          <p>OM5K-7906 - <a href="https://dev.diamondkey.com/browse/OM5K-7906">https://dev.diamondkey.com/browse/OM5K-7906</a></p>
          <p>OM5K-7912 - <a href="https://dev.diamondkey.com/browse/OM5K-7912">https://dev.diamondkey.com/browse/OM5K-7912</a></p>
          <p>OM5K-7916 - <a href="https://dev.diamondkey.com/browse/OM5K-7916">https://dev.diamondkey.com/browse/OM5K-7916</a></p>
          <p>OM5K-7931 - <a href="https://dev.diamondkey.com/browse/OM5K-7931">https://dev.diamondkey.com/browse/OM5K-7931</a></p>
          <p>OM5K-7932 - <a href="https://dev.diamondkey.com/browse/OM5K-7932">https://dev.diamondkey.com/browse/OM5K-7932</a></p>
          <p>OM5K-7934 - <a href="https://dev.diamondkey.com/browse/OM5K-7934">https://dev.diamondkey.com/browse/OM5K-7934</a></p>
          <p>OM5K-7935 - <a href="https://dev.diamondkey.com/browse/OM5K-7935">https://dev.diamondkey.com/browse/OM5K-7935</a></p>
          <p>OM5K-7936 - <a href="https://dev.diamondkey.com/browse/OM5K-7936">https://dev.diamondkey.com/browse/OM5K-7936</a></p>
          <p>OM5K-7939 - <a href="https://dev.diamondkey.com/browse/OM5K-7939">https://dev.diamondkey.com/browse/OM5K-7939</a></p>
          <p>OM5K-7940 - <a href="https://dev.diamondkey.com/browse/OM5K-7940">https://dev.diamondkey.com/browse/OM5K-7940</a></p>
          <p>OM5K-7960 - <a href="https://dev.diamondkey.com/browse/OM5K-7960">https://dev.diamondkey.com/browse/OM5K-7960</a></p>
          <p>OM5K-7963 - <a href="https://dev.diamondkey.com/browse/OM5K-7963">https://dev.diamondkey.com/browse/OM5K-7963</a></p>
          <p>OM5K-7966 - <a href="https://dev.diamondkey.com/browse/OM5K-7966">https://dev.diamondkey.com/browse/OM5K-7966</a></p>
          <p>OM5K-7973 - <a href="https://dev.diamondkey.com/browse/OM5K-7973">https://dev.diamondkey.com/browse/OM5K-7973</a></p>
          <p>OM5K-7974 - <a href="https://dev.diamondkey.com/browse/OM5K-7974">https://dev.diamondkey.com/browse/OM5K-7974</a></p>
          <p>OM5K-7982 - <a href="https://dev.diamondkey.com/browse/OM5K-7982">https://dev.diamondkey.com/browse/OM5K-7982</a></p>
          <p>OM5K-7988 - <a href="https://dev.diamondkey.com/browse/OM5K-7988">https://dev.diamondkey.com/browse/OM5K-7988</a></p>
          <p>OM5K-8063 - <a href="https://dev.diamondkey.com/browse/OM5K-8063">https://dev.diamondkey.com/browse/OM5K-8063</a></p>
          <p>OM5K-7392 - <a href="https://dev.diamondkey.com/browse/OM5K-7392">https://dev.diamondkey.com/browse/OM5K-7392</a></p>
          <p>OM5K-7508 - <a href="https://dev.diamondkey.com/browse/OM5K-7508">https://dev.diamondkey.com/browse/OM5K-7508</a></p>
          <p>OM5K-7522 - <a href="https://dev.diamondkey.com/browse/OM5K-7522">https://dev.diamondkey.com/browse/OM5K-7522</a></p>
          <p>OM5K-7565 - <a href="https://dev.diamondkey.com/browse/OM5K-7565">https://dev.diamondkey.com/browse/OM5K-7565</a></p>
          <p>OM5K-7715 - <a href="https://dev.diamondkey.com/browse/OM5K-7715">https://dev.diamondkey.com/browse/OM5K-7715</a></p>
          <p>OM5K-7814 - <a href="https://dev.diamondkey.com/browse/OM5K-7814">https://dev.diamondkey.com/browse/OM5K-7814</a></p>
          <p>OM5K-7865 - <a href="https://dev.diamondkey.com/browse/OM5K-7865">https://dev.diamondkey.com/browse/OM5K-7865</a></p>
          <p>OM5K-7907 - <a href="https://dev.diamondkey.com/browse/OM5K-7907">https://dev.diamondkey.com/browse/OM5K-7907</a></p>
          <p>OM5K-7914 - <a href="https://dev.diamondkey.com/browse/OM5K-7914">https://dev.diamondkey.com/browse/OM5K-7914</a></p>
          <p>OM5K-7971 - <a href="https://dev.diamondkey.com/browse/OM5K-7971">https://dev.diamondkey.com/browse/OM5K-7971</a></p>
          <p>OM5K-7995 - <a href="https://dev.diamondkey.com/browse/OM5K-7995">https://dev.diamondkey.com/browse/OM5K-7995</a></p>
          <p>OM5K-7997 - <a href="https://dev.diamondkey.com/browse/OM5K-7997">https://dev.diamondkey.com/browse/OM5K-7997</a></p>
          <p>OM5K-8058 - <a href="https://dev.diamondkey.com/browse/OM5K-8058">https://dev.diamondkey.com/browse/OM5K-8058</a></p>
          <p>OM5K-8061 - <a href="https://dev.diamondkey.com/browse/OM5K-8061">https://dev.diamondkey.com/browse/OM5K-8061</a></p>
          <p>OM5K-8062 - <a href="https://dev.diamondkey.com/browse/OM5K-8062">https://dev.diamondkey.com/browse/OM5K-8062</a></p>
          <p>OM5K-8070 - <a href="https://dev.diamondkey.com/browse/OM5K-8070">https://dev.diamondkey.com/browse/OM5K-8070</a></p>
          <p>OM5K-7910 - <a href="https://dev.diamondkey.com/browse/OM5K-7910">https://dev.diamondkey.com/browse/OM5K-7910</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.11) - 13/10/2020`,
    content: (
      <>
        <>
          <p>OM5K-7898 - <a href="https://dev.diamondkey.com/browse/OM5K-7898">https://dev.diamondkey.com/browse/OM5K-7898</a></p>
          <p>OM5K-7942 - <a href="https://dev.diamondkey.com/browse/OM5K-7942">https://dev.diamondkey.com/browse/OM5K-7942</a></p>
          <p>OM5K-7963 - <a href="https://dev.diamondkey.com/browse/OM5K-7963">https://dev.diamondkey.com/browse/OM5K-7963</a></p>
          <p>OM5K-7827 - <a href="https://dev.diamondkey.com/browse/OM5K-7827">https://dev.diamondkey.com/browse/OM5K-7827</a></p>
          <p>OM5K-7954 - <a href="https://dev.diamondkey.com/browse/OM5K-7954">https://dev.diamondkey.com/browse/OM5K-7954</a></p>
          <p>OM5K-7955 - <a href="https://dev.diamondkey.com/browse/OM5K-7955">https://dev.diamondkey.com/browse/OM5K-7955</a></p>
          <p>OM5K-7956 - <a href="https://dev.diamondkey.com/browse/OM5K-7956">https://dev.diamondkey.com/browse/OM5K-7956</a></p>
          <p>OM5K-7957 - <a href="https://dev.diamondkey.com/browse/OM5K-7957">https://dev.diamondkey.com/browse/OM5K-7957</a></p>
          <p>OM5K-7877 - <a href="https://dev.diamondkey.com/browse/OM5K-7877">https://dev.diamondkey.com/browse/OM5K-7877</a></p>
          <p>OM5K-7847 - <a href="https://dev.diamondkey.com/browse/OM5K-7847">https://dev.diamondkey.com/browse/OM5K-7847</a></p>
          <p>OM5K-7938 - <a href="https://dev.diamondkey.com/browse/OM5K-7938">https://dev.diamondkey.com/browse/OM5K-7938</a></p>
          <p>OM5K-7978 - <a href="https://dev.diamondkey.com/browse/OM5K-7978">https://dev.diamondkey.com/browse/OM5K-7978</a></p>
          <p>OM5K-8039 - <a href="https://dev.diamondkey.com/browse/OM5K-8039">https://dev.diamondkey.com/browse/OM5K-8039</a></p>
          <p>OM5K-7542 - <a href="https://dev.diamondkey.com/browse/OM5K-7542">https://dev.diamondkey.com/browse/OM5K-7542</a></p>
          <p>OM5K-7950 - <a href="https://dev.diamondkey.com/browse/OM5K-7950">https://dev.diamondkey.com/browse/OM5K-7950</a></p>
          <p>OM5K-7961 - <a href="https://dev.diamondkey.com/browse/OM5K-7961">https://dev.diamondkey.com/browse/OM5K-7961</a></p>
          <p>OM5K-7962 - <a href="https://dev.diamondkey.com/browse/OM5K-7962">https://dev.diamondkey.com/browse/OM5K-7962</a></p>
          <p>OM5K-7967 - <a href="https://dev.diamondkey.com/browse/OM5K-7967">https://dev.diamondkey.com/browse/OM5K-7967</a></p>
          <p>OM5K-7968 - <a href="https://dev.diamondkey.com/browse/OM5K-7968">https://dev.diamondkey.com/browse/OM5K-7968</a></p>
          <p>OM5K-7969 - <a href="https://dev.diamondkey.com/browse/OM5K-7969">https://dev.diamondkey.com/browse/OM5K-7969</a></p>
          <p>OM5K-7970 - <a href="https://dev.diamondkey.com/browse/OM5K-7970">https://dev.diamondkey.com/browse/OM5K-7970</a></p>
          <p>OM5K-7972 - <a href="https://dev.diamondkey.com/browse/OM5K-7972">https://dev.diamondkey.com/browse/OM5K-7972</a></p>
          <p>OM5K-7992 - <a href="https://dev.diamondkey.com/browse/OM5K-7992">https://dev.diamondkey.com/browse/OM5K-7992</a></p>
          <p>OM5K-7993 - <a href="https://dev.diamondkey.com/browse/OM5K-7993">https://dev.diamondkey.com/browse/OM5K-7993</a></p>
          <p>OM5K-7991 - <a href="https://dev.diamondkey.com/browse/OM5K-7991">https://dev.diamondkey.com/browse/OM5K-7991</a></p>
          <p>OM5K-7683 - <a href="https://dev.diamondkey.com/browse/OM5K-7683">https://dev.diamondkey.com/browse/OM5K-7683</a></p>
          <p>OM5K-7734 - <a href="https://dev.diamondkey.com/browse/OM5K-7734">https://dev.diamondkey.com/browse/OM5K-7734</a></p>
          <p>OM5K-7924 - <a href="https://dev.diamondkey.com/browse/OM5K-7924">https://dev.diamondkey.com/browse/OM5K-7924</a></p>
          <p>OM5K-7986 - <a href="https://dev.diamondkey.com/browse/OM5K-7986">https://dev.diamondkey.com/browse/OM5K-7986</a></p>
          <p>OM5K-7987 - <a href="https://dev.diamondkey.com/browse/OM5K-7987">https://dev.diamondkey.com/browse/OM5K-7987</a></p>
          <p>OM5K-7998 - <a href="https://dev.diamondkey.com/browse/OM5K-7998">https://dev.diamondkey.com/browse/OM5K-7998</a></p>
          <p>OM5K-8006 - <a href="https://dev.diamondkey.com/browse/OM5K-8006">https://dev.diamondkey.com/browse/OM5K-8006</a></p>
          <p>OM5K-7812 - <a href="https://dev.diamondkey.com/browse/OM5K-7812">https://dev.diamondkey.com/browse/OM5K-7812</a></p>
          <p>OM5K-7813 - <a href="https://dev.diamondkey.com/browse/OM5K-7813">https://dev.diamondkey.com/browse/OM5K-7813</a></p>
          <p>OM5K-7899 - <a href="https://dev.diamondkey.com/browse/OM5K-7899">https://dev.diamondkey.com/browse/OM5K-7899</a></p>
          <p>OM5K-7901 - <a href="https://dev.diamondkey.com/browse/OM5K-7901">https://dev.diamondkey.com/browse/OM5K-7901</a></p>
          <p>OM5K-7913 - <a href="https://dev.diamondkey.com/browse/OM5K-7913">https://dev.diamondkey.com/browse/OM5K-7913</a></p>
          <p>OM5K-7925 - <a href="https://dev.diamondkey.com/browse/OM5K-7925">https://dev.diamondkey.com/browse/OM5K-7925</a></p>
          <p>OM5K-7932 - <a href="https://dev.diamondkey.com/browse/OM5K-7932">https://dev.diamondkey.com/browse/OM5K-7932</a></p>
          <p>OM5K-7933 - <a href="https://dev.diamondkey.com/browse/OM5K-7933">https://dev.diamondkey.com/browse/OM5K-7933</a></p>
          <p>OM5K-7934 - <a href="https://dev.diamondkey.com/browse/OM5K-7934">https://dev.diamondkey.com/browse/OM5K-7934</a></p>
          <p>OM5K-7937 - <a href="https://dev.diamondkey.com/browse/OM5K-7937">https://dev.diamondkey.com/browse/OM5K-7937</a></p>
          <p>OM5K-7940 - <a href="https://dev.diamondkey.com/browse/OM5K-7940">https://dev.diamondkey.com/browse/OM5K-7940</a></p>
          <p>OM5K-7947 - <a href="https://dev.diamondkey.com/browse/OM5K-7947">https://dev.diamondkey.com/browse/OM5K-7947</a></p>
          <p>OM5K-7948 - <a href="https://dev.diamondkey.com/browse/OM5K-7948">https://dev.diamondkey.com/browse/OM5K-7948</a></p>
          <p>OM5K-7958 - <a href="https://dev.diamondkey.com/browse/OM5K-7958">https://dev.diamondkey.com/browse/OM5K-7958</a></p>
          <p>OM5K-7975 - <a href="https://dev.diamondkey.com/browse/OM5K-7975">https://dev.diamondkey.com/browse/OM5K-7975</a></p>
          <p>OM5K-7977 - <a href="https://dev.diamondkey.com/browse/OM5K-7977">https://dev.diamondkey.com/browse/OM5K-7977</a></p>
          <p>OM5K-7989 - <a href="https://dev.diamondkey.com/browse/OM5K-7989">https://dev.diamondkey.com/browse/OM5K-7989</a></p>
          <p>OM5K-7990 - <a href="https://dev.diamondkey.com/browse/OM5K-7990">https://dev.diamondkey.com/browse/OM5K-7990</a></p>
          <p>OM5K-8000 - <a href="https://dev.diamondkey.com/browse/OM5K-8000">https://dev.diamondkey.com/browse/OM5K-8000</a></p>
          <p>OM5K-8001 - <a href="https://dev.diamondkey.com/browse/OM5K-8001">https://dev.diamondkey.com/browse/OM5K-8001</a></p>
          <p>OM5K-8005 - <a href="https://dev.diamondkey.com/browse/OM5K-8005">https://dev.diamondkey.com/browse/OM5K-8005</a></p>
          <p>OM5K-7885 - <a href="https://dev.diamondkey.com/browse/OM5K-7885">https://dev.diamondkey.com/browse/OM5K-7885</a></p>
          <p>OM5K-7909 - <a href="https://dev.diamondkey.com/browse/OM5K-7909">https://dev.diamondkey.com/browse/OM5K-7909</a></p>
          <p>OM5K-7915 - <a href="https://dev.diamondkey.com/browse/OM5K-7915">https://dev.diamondkey.com/browse/OM5K-7915</a></p>
          <p>OM5K-7923 - <a href="https://dev.diamondkey.com/browse/OM5K-7923">https://dev.diamondkey.com/browse/OM5K-7923</a></p>
          <p>OM5K-7927 - <a href="https://dev.diamondkey.com/browse/OM5K-7927">https://dev.diamondkey.com/browse/OM5K-7927</a></p>
          <p>OM5K-7951 - <a href="https://dev.diamondkey.com/browse/OM5K-7951">https://dev.diamondkey.com/browse/OM5K-7951</a></p>
          <p>OM5K-7994 - <a href="https://dev.diamondkey.com/browse/OM5K-7994">https://dev.diamondkey.com/browse/OM5K-7994</a></p>
          <p>OM5K-7809 - <a href="https://dev.diamondkey.com/browse/OM5K-7809">https://dev.diamondkey.com/browse/OM5K-7809</a></p>
          <p>OM5K-7843 - <a href="https://dev.diamondkey.com/browse/OM5K-7843">https://dev.diamondkey.com/browse/OM5K-7843</a></p>
          <p>OM5K-7846 - <a href="https://dev.diamondkey.com/browse/OM5K-7846">https://dev.diamondkey.com/browse/OM5K-7846</a></p>
          <p>OM5K-7817 - <a href="https://dev.diamondkey.com/browse/OM5K-7817">https://dev.diamondkey.com/browse/OM5K-7817</a></p>
          <p>OM5K-7856 - <a href="https://dev.diamondkey.com/browse/OM5K-7856">https://dev.diamondkey.com/browse/OM5K-7856</a></p>
          <p>OM5K-7858 - <a href="https://dev.diamondkey.com/browse/OM5K-7858">https://dev.diamondkey.com/browse/OM5K-7858</a></p>
          <p>OM5K-7859 - <a href="https://dev.diamondkey.com/browse/OM5K-7859">https://dev.diamondkey.com/browse/OM5K-7859</a></p>
          <p>OM5K-7864 - <a href="https://dev.diamondkey.com/browse/OM5K-7864">https://dev.diamondkey.com/browse/OM5K-7864</a></p>
          <p>OM5K-7889 - <a href="https://dev.diamondkey.com/browse/OM5K-7889">https://dev.diamondkey.com/browse/OM5K-7889</a></p>
          <p>OM5K-7904 - <a href="https://dev.diamondkey.com/browse/OM5K-7904">https://dev.diamondkey.com/browse/OM5K-7904</a></p>
          <p>OM5K-7928 - <a href="https://dev.diamondkey.com/browse/OM5K-7928">https://dev.diamondkey.com/browse/OM5K-7928</a></p>
          <p>OM5K-7736 - <a href="https://dev.diamondkey.com/browse/OM5K-7736">https://dev.diamondkey.com/browse/OM5K-7736</a></p>
          <p>OM5K-7741 - <a href="https://dev.diamondkey.com/browse/OM5K-7741">https://dev.diamondkey.com/browse/OM5K-7741</a></p>
          <p>OM5K-7784 - <a href="https://dev.diamondkey.com/browse/OM5K-7784">https://dev.diamondkey.com/browse/OM5K-7784</a></p>
          <p>OM5K-7785 - <a href="https://dev.diamondkey.com/browse/OM5K-7785">https://dev.diamondkey.com/browse/OM5K-7785</a></p>
          <p>OM5K-7794 - <a href="https://dev.diamondkey.com/browse/OM5K-7794">https://dev.diamondkey.com/browse/OM5K-7794</a></p>
          <p>OM5K-7796 - <a href="https://dev.diamondkey.com/browse/OM5K-7796">https://dev.diamondkey.com/browse/OM5K-7796</a></p>
          <p>OM5K-7797 - <a href="https://dev.diamondkey.com/browse/OM5K-7797">https://dev.diamondkey.com/browse/OM5K-7797</a></p>
          <p>OM5K-7813 - <a href="https://dev.diamondkey.com/browse/OM5K-7813">https://dev.diamondkey.com/browse/OM5K-7813</a></p>
          <p>OM5K-7819 - <a href="https://dev.diamondkey.com/browse/OM5K-7819">https://dev.diamondkey.com/browse/OM5K-7819</a></p>
          <p>OM5K-7820 - <a href="https://dev.diamondkey.com/browse/OM5K-7820">https://dev.diamondkey.com/browse/OM5K-7820</a></p>
          <p>OM5K-7822 - <a href="https://dev.diamondkey.com/browse/OM5K-7822">https://dev.diamondkey.com/browse/OM5K-7822</a></p>
          <p>OM5K-7824 - <a href="https://dev.diamondkey.com/browse/OM5K-7824">https://dev.diamondkey.com/browse/OM5K-7824</a></p>
          <p>OM5K-7825 - <a href="https://dev.diamondkey.com/browse/OM5K-7825">https://dev.diamondkey.com/browse/OM5K-7825</a></p>
          <p>OM5K-7826 - <a href="https://dev.diamondkey.com/browse/OM5K-7826">https://dev.diamondkey.com/browse/OM5K-7826</a></p>
          <p>OM5K-7827 - <a href="https://dev.diamondkey.com/browse/OM5K-7827">https://dev.diamondkey.com/browse/OM5K-7827</a></p>
          <p>OM5K-7828 - <a href="https://dev.diamondkey.com/browse/OM5K-7828">https://dev.diamondkey.com/browse/OM5K-7828</a></p>
          <p>OM5K-7844 - <a href="https://dev.diamondkey.com/browse/OM5K-7844">https://dev.diamondkey.com/browse/OM5K-7844</a></p>
          <p>OM5K-7847 - <a href="https://dev.diamondkey.com/browse/OM5K-7847">https://dev.diamondkey.com/browse/OM5K-7847</a></p>
          <p>OM5K-7848 - <a href="https://dev.diamondkey.com/browse/OM5K-7848">https://dev.diamondkey.com/browse/OM5K-7848</a></p>
          <p>OM5K-7849 - <a href="https://dev.diamondkey.com/browse/OM5K-7849">https://dev.diamondkey.com/browse/OM5K-7849</a></p>
          <p>OM5K-7855 - <a href="https://dev.diamondkey.com/browse/OM5K-7855">https://dev.diamondkey.com/browse/OM5K-7855</a></p>
          <p>OM5K-7857 - <a href="https://dev.diamondkey.com/browse/OM5K-7857">https://dev.diamondkey.com/browse/OM5K-7857</a></p>
          <p>OM5K-7866 - <a href="https://dev.diamondkey.com/browse/OM5K-7866">https://dev.diamondkey.com/browse/OM5K-7866</a></p>
          <p>OM5K-7867 - <a href="https://dev.diamondkey.com/browse/OM5K-7867">https://dev.diamondkey.com/browse/OM5K-7867</a></p>
          <p>OM5K-7868 - <a href="https://dev.diamondkey.com/browse/OM5K-7868">https://dev.diamondkey.com/browse/OM5K-7868</a></p>
          <p>OM5K-7878 - <a href="https://dev.diamondkey.com/browse/OM5K-7878">https://dev.diamondkey.com/browse/OM5K-7878</a></p>
          <p>OM5K-7879 - <a href="https://dev.diamondkey.com/browse/OM5K-7879">https://dev.diamondkey.com/browse/OM5K-7879</a></p>
          <p>OM5K-7880 - <a href="https://dev.diamondkey.com/browse/OM5K-7880">https://dev.diamondkey.com/browse/OM5K-7880</a></p>
          <p>OM5K-7881 - <a href="https://dev.diamondkey.com/browse/OM5K-7881">https://dev.diamondkey.com/browse/OM5K-7881</a></p>
          <p>OM5K-7882 - <a href="https://dev.diamondkey.com/browse/OM5K-7882">https://dev.diamondkey.com/browse/OM5K-7882</a></p>
          <p>OM5K-7884 - <a href="https://dev.diamondkey.com/browse/OM5K-7884">https://dev.diamondkey.com/browse/OM5K-7884</a></p>
          <p>OM5K-7886 - <a href="https://dev.diamondkey.com/browse/OM5K-7886">https://dev.diamondkey.com/browse/OM5K-7886</a></p>
          <p>OM5K-7887 - <a href="https://dev.diamondkey.com/browse/OM5K-7887">https://dev.diamondkey.com/browse/OM5K-7887</a></p>
          <p>OM5K-7888 - <a href="https://dev.diamondkey.com/browse/OM5K-7888">https://dev.diamondkey.com/browse/OM5K-7888</a></p>
          <p>OM5K-7916 - <a href="https://dev.diamondkey.com/browse/OM5K-7916">https://dev.diamondkey.com/browse/OM5K-7916</a></p>
          <p>OM5K-7917 - <a href="https://dev.diamondkey.com/browse/OM5K-7917">https://dev.diamondkey.com/browse/OM5K-7917</a></p>
          <p>OM5K-7921 - <a href="https://dev.diamondkey.com/browse/OM5K-7921">https://dev.diamondkey.com/browse/OM5K-7921</a></p>
          <p>OM5K-7941 - <a href="https://dev.diamondkey.com/browse/OM5K-7941">https://dev.diamondkey.com/browse/OM5K-7941</a></p>
          <p>OM5K-7943 - <a href="https://dev.diamondkey.com/browse/OM5K-7943">https://dev.diamondkey.com/browse/OM5K-7943</a></p>
          <p>OM5K-7945 - <a href="https://dev.diamondkey.com/browse/OM5K-7945">https://dev.diamondkey.com/browse/OM5K-7945</a></p>
          <p>OM5K-7949 - <a href="https://dev.diamondkey.com/browse/OM5K-7949">https://dev.diamondkey.com/browse/OM5K-7949</a></p>
          <p>OM5K-7172 - <a href="https://dev.diamondkey.com/browse/OM5K-7172">https://dev.diamondkey.com/browse/OM5K-7172</a></p>
          <p>OM5K-7663 - <a href="https://dev.diamondkey.com/browse/OM5K-7663">https://dev.diamondkey.com/browse/OM5K-7663</a></p>
          <p>OM5K-7664 - <a href="https://dev.diamondkey.com/browse/OM5K-7664">https://dev.diamondkey.com/browse/OM5K-7664</a></p>
          <p>OM5K-7684 - <a href="https://dev.diamondkey.com/browse/OM5K-7684">https://dev.diamondkey.com/browse/OM5K-7684</a></p>
          <p>OM5K-7821 - <a href="https://dev.diamondkey.com/browse/OM5K-7821">https://dev.diamondkey.com/browse/OM5K-7821</a></p>
          <p>OM5K-7840 - <a href="https://dev.diamondkey.com/browse/OM5K-7840">https://dev.diamondkey.com/browse/OM5K-7840</a></p>
          <p>OM5K-7929 - <a href="https://dev.diamondkey.com/browse/OM5K-7929">https://dev.diamondkey.com/browse/OM5K-7929</a></p>
          <p>OM5K-7672 - <a href="https://dev.diamondkey.com/browse/OM5K-7672">https://dev.diamondkey.com/browse/OM5K-7672</a></p>
          <p>OM5K-7676 - <a href="https://dev.diamondkey.com/browse/OM5K-7676">https://dev.diamondkey.com/browse/OM5K-7676</a></p>
          <p>OM5K-7918 - <a href="https://dev.diamondkey.com/browse/OM5K-7918">https://dev.diamondkey.com/browse/OM5K-7918</a></p>
          <p>OM5K-7922 - <a href="https://dev.diamondkey.com/browse/OM5K-7922">https://dev.diamondkey.com/browse/OM5K-7922</a></p>
          <p>OM5K-7930 - <a href="https://dev.diamondkey.com/browse/OM5K-7930">https://dev.diamondkey.com/browse/OM5K-7930</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.10b) - 29/09/2020`,
    content: (
      <>
        <>
          <p>OM5K-7846 - <a>https://dev.diamondkey.com/browse/OM5K-7846</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.10a) - 25/09/2020`,
    content: (
      <>
        <>
          <p>OM5K-7843 - <a>https://dev.diamondkey.com/browse/OM5K-7843</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.10) - 23/09/2020`,
    content: (
      <>
        <>
          <p>OM5K-7809 - <a>https://dev.diamondkey.com/browse/OM5K-7809</a></p>
          <p>OM5K-7433 - <a>https://dev.diamondkey.com/browse/OM5K-7433</a></p>
          <p>OM5K-7636 - <a>https://dev.diamondkey.com/browse/OM5K-7636</a></p>
          <p>OM5K-7638 - <a>https://dev.diamondkey.com/browse/OM5K-7638</a></p>
          <p>OM5K-7700 - <a>https://dev.diamondkey.com/browse/OM5K-7700</a></p>
          <p>OM5K-7756 - <a>https://dev.diamondkey.com/browse/OM5K-7756</a></p>
          <p>OM5K-7762 - <a>https://dev.diamondkey.com/browse/OM5K-7762</a></p>
          <p>OM5K-7774 - <a>https://dev.diamondkey.com/browse/OM5K-7774</a></p>
          <p>OM5K-7132 - <a>https://dev.diamondkey.com/browse/OM5K-7132</a></p>
          <p>OM5K-7571 - <a>https://dev.diamondkey.com/browse/OM5K-7571</a></p>
          <p>OM5K-7691 - <a>https://dev.diamondkey.com/browse/OM5K-7691</a></p>
          <p>OM5K-7697 - <a>https://dev.diamondkey.com/browse/OM5K-7697</a></p>
          <p>OM5K-7706 - <a>https://dev.diamondkey.com/browse/OM5K-7706</a></p>
          <p>OM5K-7719 - <a>https://dev.diamondkey.com/browse/OM5K-7719</a></p>
          <p>OM5K-7734 - <a>https://dev.diamondkey.com/browse/OM5K-7734</a></p>
          <p>OM5K-7753 - <a>https://dev.diamondkey.com/browse/OM5K-7753</a></p>
          <p>OM5K-7754 - <a>https://dev.diamondkey.com/browse/OM5K-7754</a></p>
          <p>OM5K-7755 - <a>https://dev.diamondkey.com/browse/OM5K-7755</a></p>
          <p>OM5K-7757 - <a>https://dev.diamondkey.com/browse/OM5K-7757</a></p>
          <p>OM5K-7759 - <a>https://dev.diamondkey.com/browse/OM5K-7759</a></p>
          <p>OM5K-7761 - <a>https://dev.diamondkey.com/browse/OM5K-7761</a></p>
          <p>OM5K-7768 - <a>https://dev.diamondkey.com/browse/OM5K-7768</a></p>
          <p>OM5K-7775 - <a>https://dev.diamondkey.com/browse/OM5K-7775</a></p>
          <p>OM5K-7776 - <a>https://dev.diamondkey.com/browse/OM5K-7776</a></p>
          <p>OM5K-7778 - <a>https://dev.diamondkey.com/browse/OM5K-7778</a></p>
          <p>OM5K-7779 - <a>https://dev.diamondkey.com/browse/OM5K-7779</a></p>
          <p>OM5K-7782 - <a>https://dev.diamondkey.com/browse/OM5K-7782</a></p>
          <p>OM5K-7786 - <a>https://dev.diamondkey.com/browse/OM5K-7786</a></p>
          <p>OM5K-7787 - <a>https://dev.diamondkey.com/browse/OM5K-7787</a></p>
          <p>OM5K-7788 - <a>https://dev.diamondkey.com/browse/OM5K-7788</a></p>
          <p>OM5K-7793 - <a>https://dev.diamondkey.com/browse/OM5K-7793</a></p>
          <p>OM5K-7803 - <a>https://dev.diamondkey.com/browse/OM5K-7803</a></p>
          <p>OM5K-7804 - <a>https://dev.diamondkey.com/browse/OM5K-7804</a></p>
          <p>OM5K-6974 - <a>https://dev.diamondkey.com/browse/OM5K-6974</a></p>
          <p>OM5K-7273 - <a>https://dev.diamondkey.com/browse/OM5K-7273</a></p>
          <p>OM5K-7667 - <a>https://dev.diamondkey.com/browse/OM5K-7667</a></p>
          <p>OM5K-7673 - <a>https://dev.diamondkey.com/browse/OM5K-7673</a></p>
          <p>OM5K-7693 - <a>https://dev.diamondkey.com/browse/OM5K-7693</a></p>
          <p>OM5K-7705 - <a>https://dev.diamondkey.com/browse/OM5K-7705</a></p>
          <p>OM5K-7718 - <a>https://dev.diamondkey.com/browse/OM5K-7718</a></p>
          <p>OM5K-7722 - <a>https://dev.diamondkey.com/browse/OM5K-7722</a></p>
          <p>OM5K-7730 - <a>https://dev.diamondkey.com/browse/OM5K-7730</a></p>
          <p>OM5K-7765 - <a>https://dev.diamondkey.com/browse/OM5K-7765</a></p>
          <p>OM5K-7766 - <a>https://dev.diamondkey.com/browse/OM5K-7766</a></p>
          <p>OM5K-7767 - <a>https://dev.diamondkey.com/browse/OM5K-7767</a></p>
          <p>OM5K-7769 - <a>https://dev.diamondkey.com/browse/OM5K-7769</a></p>
          <p>OM5K-7802 - <a>https://dev.diamondkey.com/browse/OM5K-7802</a></p>
          <p>OM5K-6853 - <a>https://dev.diamondkey.com/browse/OM5K-6853</a></p>
          <p>OM5K-7675 - <a>https://dev.diamondkey.com/browse/OM5K-7675</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.9) - 14/09/2020`,
    content: (
      <>
        <>
          <p>OM5K-7764 - <a>https://dev.diamondkey.com/browse/OM5K-7764</a></p>
          <p>OM5K-7762 - <a>https://dev.diamondkey.com/browse/OM5K-7762</a></p>
          <p>OM5K-7761 - <a>https://dev.diamondkey.com/browse/OM5K-7761</a></p>
          <p>OM5K-7271 - <a>https://dev.diamondkey.com/browse/OM5K-7271</a></p>
          <p>OM5K-7689 - <a>https://dev.diamondkey.com/browse/OM5K-7689</a></p>
          <p>OM5K-7699 - <a>https://dev.diamondkey.com/browse/OM5K-7699</a></p>
          <p>OM5K-7703 - <a>https://dev.diamondkey.com/browse/OM5K-7703</a></p>
          <p>OM5K-7734 - <a>https://dev.diamondkey.com/browse/OM5K-7734</a></p>
          <p>OM5K-7737 - <a>https://dev.diamondkey.com/browse/OM5K-7737</a></p>
          <p>OM5K-7748 - <a>https://dev.diamondkey.com/browse/OM5K-7748</a></p>
          <p>OM5K-7751 - <a>https://dev.diamondkey.com/browse/OM5K-7751</a></p>
          <p>OM5K-7721 - <a>https://dev.diamondkey.com/browse/OM5K-7721</a></p>
          <p>OM5K-7727 - <a>https://dev.diamondkey.com/browse/OM5K-7727</a></p>
          <p>OM5K-7728 - <a>https://dev.diamondkey.com/browse/OM5K-7728</a></p>
          <p>OM5K-7729 - <a>https://dev.diamondkey.com/browse/OM5K-7729</a></p>
          <p>OM5K-7731 - <a>https://dev.diamondkey.com/browse/OM5K-7731</a></p>
          <p>OM5K-7677 - <a>https://dev.diamondkey.com/browse/OM5K-7677</a></p>
          <p>OM5K-7712 - <a>https://dev.diamondkey.com/browse/OM5K-7712</a></p>
          <p>OM5K-7432 - <a>https://dev.diamondkey.com/browse/OM5K-7432</a></p>
          <p>OM5K-7623 - <a>https://dev.diamondkey.com/browse/OM5K-7623</a></p>
          <p>OM5K-7634 - <a>https://dev.diamondkey.com/browse/OM5K-7634</a></p>
          <p>OM5K-7635 - <a>https://dev.diamondkey.com/browse/OM5K-7635</a></p>
          <p>OM5K-7637 - <a>https://dev.diamondkey.com/browse/OM5K-7637</a></p>
          <p>OM5K-7692 - <a>https://dev.diamondkey.com/browse/OM5K-7692</a></p>
          <p>OM5K-7709 - <a>https://dev.diamondkey.com/browse/OM5K-7709</a></p>
          <p>OM5K-7297 - <a>https://dev.diamondkey.com/browse/OM5K-7297</a></p>
          <p>OM5K-7688 - <a>https://dev.diamondkey.com/browse/OM5K-7688</a></p>
          <p>OM5K-7690 - <a>https://dev.diamondkey.com/browse/OM5K-7690</a></p>
          <p>OM5K-7696 - <a>https://dev.diamondkey.com/browse/OM5K-7696</a></p>
          <p>OM5K-7708 - <a>https://dev.diamondkey.com/browse/OM5K-7708</a></p>
          <p>OM5K-7735 - <a>https://dev.diamondkey.com/browse/OM5K-7735</a></p>
          <p>OM5K-7740 - <a>https://dev.diamondkey.com/browse/OM5K-7740</a></p>
          <p>OM5K-7744 - <a>https://dev.diamondkey.com/browse/OM5K-7744</a></p>
          <p>OM5K-7745 - <a>https://dev.diamondkey.com/browse/OM5K-7745</a></p>
          <p>OM5K-7747 - <a>https://dev.diamondkey.com/browse/OM5K-7747</a></p>
          <p>OM5K-7725 - <a>https://dev.diamondkey.com/browse/OM5K-7725</a></p>
          <p>OM5K-7710 - <a>https://dev.diamondkey.com/browse/OM5K-7710</a></p>
          <p>OM5K-7711 - <a>https://dev.diamondkey.com/browse/OM5K-7711</a></p>
          <p>OM5K-7717 - <a>https://dev.diamondkey.com/browse/OM5K-7717</a></p>
          <p>OM5K-7720 - <a>https://dev.diamondkey.com/browse/OM5K-7720</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Notes (10.1.8) - 07/09/2020`,
    content: (
      <>
        <>
          <p>OM5K-7433 - <a>https://dev.diamondkey.com/browse/OM5K-7433</a></p>
          <p>OM5K-7686 - <a>https://dev.diamondkey.com/browse/OM5K-7686</a></p>
          <p>OM5K-7302 - <a>https://dev.diamondkey.com/browse/OM5K-7302</a></p>
          <p>OM5K-7306 - <a>https://dev.diamondkey.com/browse/OM5K-7306</a></p>
          <p>OM5K-7662 - <a>https://dev.diamondkey.com/browse/OM5K-7662</a></p>
          <p>OM5K-7568 - <a>https://dev.diamondkey.com/browse/OM5K-7568</a></p>
          <p>OM5K-7271 - <a>https://dev.diamondkey.com/browse/OM5K-7271</a></p>
          <p>OM5K-7629 - <a>https://dev.diamondkey.com/browse/OM5K-7629</a></p>
          <p>OM5K-7632 - <a>https://dev.diamondkey.com/browse/OM5K-7632</a></p>
          <p>OM5K-7633 - <a>https://dev.diamondkey.com/browse/OM5K-7633</a></p>
          <p>OM5K-7657 - <a>https://dev.diamondkey.com/browse/OM5K-7657</a></p>
          <p>OM5K-7659 - <a>https://dev.diamondkey.com/browse/OM5K-7659</a></p>
          <p>OM5K-7431 - <a>https://dev.diamondkey.com/browse/OM5K-7431</a></p>
          <p>OM5K-7609 - <a>https://dev.diamondkey.com/browse/OM5K-7609</a></p>
          <p>OM5K-7610 - <a>https://dev.diamondkey.com/browse/OM5K-7610</a></p>
          <p>OM5K-7656 - <a>https://dev.diamondkey.com/browse/OM5K-7656</a></p>
          <p>OM5K-7661 - <a>https://dev.diamondkey.com/browse/OM5K-7661</a></p>
          <p>OM5K-7670 - <a>https://dev.diamondkey.com/browse/OM5K-7670</a></p>
          <p>OM5K-7682 - <a>https://dev.diamondkey.com/browse/OM5K-7682</a></p>
          <p>OM5K-7249 - <a>https://dev.diamondkey.com/browse/OM5K-7249</a></p>
          <p>OM5K-7285 - <a>https://dev.diamondkey.com/browse/OM5K-7285</a></p>
          <p>OM5K-7496 - <a>https://dev.diamondkey.com/browse/OM5K-7496</a></p>
          <p>OM5K-7532 - <a>https://dev.diamondkey.com/browse/OM5K-7532</a></p>
          <p>OM5K-7534 - <a>https://dev.diamondkey.com/browse/OM5K-7534</a></p>
          <p>OM5K-7542 - <a>https://dev.diamondkey.com/browse/OM5K-7542</a></p>
          <p>OM5K-7579 - <a>https://dev.diamondkey.com/browse/OM5K-7579</a></p>
          <p>OM5K-7666 - <a>https://dev.diamondkey.com/browse/OM5K-7666</a></p>
          <p>OM5K-7668 - <a>https://dev.diamondkey.com/browse/OM5K-7668</a></p>
          <p>OM5K-7669 - <a>https://dev.diamondkey.com/browse/OM5K-7669</a></p>
          <p>OM5K-7671 - <a>https://dev.diamondkey.com/browse/OM5K-7671</a></p>
          <p>OM5K-7674 - <a>https://dev.diamondkey.com/browse/OM5K-7674</a></p>
          <p>OM5K-7678 - <a>https://dev.diamondkey.com/browse/OM5K-7678</a></p>
          <p>OM5K-7679 - <a>https://dev.diamondkey.com/browse/OM5K-7679</a></p>
          <p>OM5K-6614 - <a>https://dev.diamondkey.com/browse/OM5K-6614</a></p>
          <p>OM5K-6835 - <a>https://dev.diamondkey.com/browse/OM5K-6835</a></p>
          <p>OM5K-7256 - <a>https://dev.diamondkey.com/browse/OM5K-7256</a></p>
          <p>OM5K-7276 - <a>https://dev.diamondkey.com/browse/OM5K-7276</a></p>
          <p>OM5K-7308 - <a>https://dev.diamondkey.com/browse/OM5K-7308</a></p>
          <p>OM5K-7343 - <a>https://dev.diamondkey.com/browse/OM5K-7343</a></p>
          <p>OM5K-7344 - <a>https://dev.diamondkey.com/browse/OM5K-7344</a></p>
          <p>OM5K-7378 - <a>https://dev.diamondkey.com/browse/OM5K-7378</a></p>
          <p>OM5K-7388 - <a>https://dev.diamondkey.com/browse/OM5K-7388</a></p>
          <p>OM5K-7416 - <a>https://dev.diamondkey.com/browse/OM5K-7416</a></p>
          <p>OM5K-7418 - <a>https://dev.diamondkey.com/browse/OM5K-7418</a></p>
          <p>OM5K-7420 - <a>https://dev.diamondkey.com/browse/OM5K-7420</a></p>
          <p>OM5K-7431 - <a>https://dev.diamondkey.com/browse/OM5K-7431</a></p>
          <p>OM5K-7462 - <a>https://dev.diamondkey.com/browse/OM5K-7462</a></p>
          <p>OM5K-7468 - <a>https://dev.diamondkey.com/browse/OM5K-7468</a></p>
          <p>OM5K-7469 - <a>https://dev.diamondkey.com/browse/OM5K-7469</a></p>
          <p>OM5K-7474 - <a>https://dev.diamondkey.com/browse/OM5K-7474</a></p>
          <p>OM5K-7476 - <a>https://dev.diamondkey.com/browse/OM5K-7476</a></p>
          <p>OM5K-7494 - <a>https://dev.diamondkey.com/browse/OM5K-7494</a></p>
          <p>OM5K-7508 - <a>https://dev.diamondkey.com/browse/OM5K-7508</a></p>
          <p>OM5K-7510 - <a>https://dev.diamondkey.com/browse/OM5K-7510</a></p>
          <p>OM5K-7517 - <a>https://dev.diamondkey.com/browse/OM5K-7517</a></p>
          <p>OM5K-7520 - <a>https://dev.diamondkey.com/browse/OM5K-7520</a></p>
          <p>OM5K-7523 - <a>https://dev.diamondkey.com/browse/OM5K-7523</a></p>
          <p>OM5K-7528 - <a>https://dev.diamondkey.com/browse/OM5K-7528</a></p>
          <p>OM5K-7534 - <a>https://dev.diamondkey.com/browse/OM5K-7534</a></p>
          <p>OM5K-7536 - <a>https://dev.diamondkey.com/browse/OM5K-7536</a></p>
          <p>OM5K-7538 - <a>https://dev.diamondkey.com/browse/OM5K-7538</a></p>
          <p>OM5K-7539 - <a>https://dev.diamondkey.com/browse/OM5K-7539</a></p>
          <p>OM5K-7541 - <a>https://dev.diamondkey.com/browse/OM5K-7541</a></p>
          <p>OM5K-7543 - <a>https://dev.diamondkey.com/browse/OM5K-7543</a></p>
          <p>OM5K-7544 - <a>https://dev.diamondkey.com/browse/OM5K-7544</a></p>
          <p>OM5K-7552 - <a>https://dev.diamondkey.com/browse/OM5K-7552</a></p>
          <p>OM5K-7555 - <a>https://dev.diamondkey.com/browse/OM5K-7555</a></p>
          <p>OM5K-7556 - <a>https://dev.diamondkey.com/browse/OM5K-7556</a></p>
          <p>OM5K-7557 - <a>https://dev.diamondkey.com/browse/OM5K-7557</a></p>
          <p>OM5K-7558 - <a>https://dev.diamondkey.com/browse/OM5K-7558</a></p>
          <p>OM5K-7559 - <a>https://dev.diamondkey.com/browse/OM5K-7559</a></p>
          <p>OM5K-7560 - <a>https://dev.diamondkey.com/browse/OM5K-7560</a></p>
          <p>OM5K-7561 - <a>https://dev.diamondkey.com/browse/OM5K-7561</a></p>
          <p>OM5K-7563 - <a>https://dev.diamondkey.com/browse/OM5K-7563</a></p>
          <p>OM5K-7564 - <a>https://dev.diamondkey.com/browse/OM5K-7564</a></p>
          <p>OM5K-7566 - <a>https://dev.diamondkey.com/browse/OM5K-7566</a></p>
          <p>OM5K-7569 - <a>https://dev.diamondkey.com/browse/OM5K-7569</a></p>
          <p>OM5K-7570 - <a>https://dev.diamondkey.com/browse/OM5K-7570</a></p>
          <p>OM5K-7573 - <a>https://dev.diamondkey.com/browse/OM5K-7573</a></p>
          <p>OM5K-7575 - <a>https://dev.diamondkey.com/browse/OM5K-7575</a></p>
          <p>OM5K-7580 - <a>https://dev.diamondkey.com/browse/OM5K-7580</a></p>
          <p>OM5K-7581 - <a>https://dev.diamondkey.com/browse/OM5K-7581</a></p>
          <p>OM5K-7582 - <a>https://dev.diamondkey.com/browse/OM5K-7582</a></p>
          <p>OM5K-7584 - <a>https://dev.diamondkey.com/browse/OM5K-7584</a></p>
          <p>OM5K-7611 - <a>https://dev.diamondkey.com/browse/OM5K-7611</a></p>
          <p>OM5K-7612 - <a>https://dev.diamondkey.com/browse/OM5K-7612</a></p>
          <p>OM5K-7634 - <a>https://dev.diamondkey.com/browse/OM5K-7634</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Version Notes (10.1.7) - 21/08/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>
          <p>OM5K-7309 - <a>https://dev.diamondkey.com/browse/OM5K-7309</a></p>
          <p>OM5K-7376 - <a>https://dev.diamondkey.com/browse/OM5K-7376</a></p>
          <p>OM5K-7451 - <a>https://dev.diamondkey.com/browse/OM5K-7451</a></p>
          <p>OM5K-7454 - <a>https://dev.diamondkey.com/browse/OM5K-7454</a></p>
          <p>OM5K-7505 - <a>https://dev.diamondkey.com/browse/OM5K-7505</a></p>
          <p>OM5K-7516 - <a>https://dev.diamondkey.com/browse/OM5K-7516</a></p>
          <p>OM5K-7531 - <a>https://dev.diamondkey.com/browse/OM5K-7531</a></p>
          <p>OM5K-7532 - <a>https://dev.diamondkey.com/browse/OM5K-7532</a></p>
          <p>OM5K-7540 - <a>https://dev.diamondkey.com/browse/OM5K-7540</a></p>
          <p>OM5K-6541 - <a>https://dev.diamondkey.com/browse/OM5K-6541</a></p>
          <p>OM5K-6614 - <a>https://dev.diamondkey.com/browse/OM5K-6614</a></p>
          <p>OM5K-6615 - <a>https://dev.diamondkey.com/browse/OM5K-6615</a></p>
          <p>OM5K-6922 - <a>https://dev.diamondkey.com/browse/OM5K-6922</a></p>
          <p>OM5K-7153 - <a>https://dev.diamondkey.com/browse/OM5K-7153</a></p>
          <p>OM5K-7278 - <a>https://dev.diamondkey.com/browse/OM5K-7278</a></p>
          <p>OM5K-7310 - <a>https://dev.diamondkey.com/browse/OM5K-7310</a></p>
          <p>OM5K-7317 - <a>https://dev.diamondkey.com/browse/OM5K-7317</a></p>
          <p>OM5K-7347 - <a>https://dev.diamondkey.com/browse/OM5K-7347</a></p>
          <p>OM5K-7381 - <a>https://dev.diamondkey.com/browse/OM5K-7381</a></p>
          <p>OM5K-7410 - <a>https://dev.diamondkey.com/browse/OM5K-7410</a></p>
          <p>OM5K-7421 - <a>https://dev.diamondkey.com/browse/OM5K-7421</a></p>
          <p>OM5K-7504 - <a>https://dev.diamondkey.com/browse/OM5K-7504</a></p>
          <p>OM5K-7507 - <a>https://dev.diamondkey.com/browse/OM5K-7507</a></p>
          <p>OM5K-7511 - <a>https://dev.diamondkey.com/browse/OM5K-7511</a></p>
          <p>OM5K-7517 - <a>https://dev.diamondkey.com/browse/OM5K-7517</a></p>
          <p>OM5K-7520 - <a>https://dev.diamondkey.com/browse/OM5K-7520</a></p>
          <p>OM5K-7533 - <a>https://dev.diamondkey.com/browse/OM5K-7533</a></p>
          <p>OM5K-7088 - <a>https://dev.diamondkey.com/browse/OM5K-7088</a></p>
          <p>OM5K-7131 - <a>https://dev.diamondkey.com/browse/OM5K-7131</a></p>
          <p>OM5K-7250 - <a>https://dev.diamondkey.com/browse/OM5K-7250</a></p>
          <p>OM5K-7251 - <a>https://dev.diamondkey.com/browse/OM5K-7251</a></p>
          <p>OM5K-7267 - <a>https://dev.diamondkey.com/browse/OM5K-7267</a></p>
          <p>OM5K-7280 - <a>https://dev.diamondkey.com/browse/OM5K-7280</a></p>
          <p>OM5K-7281 - <a>https://dev.diamondkey.com/browse/OM5K-7281</a></p>
          <p>OM5K-7288 - <a>https://dev.diamondkey.com/browse/OM5K-7288</a></p>
          <p>OM5K-7291 - <a>https://dev.diamondkey.com/browse/OM5K-7291</a></p>
          <p>OM5K-7348 - <a>https://dev.diamondkey.com/browse/OM5K-7348</a></p>
          <p>OM5K-7353 - <a>https://dev.diamondkey.com/browse/OM5K-7353</a></p>
          <p>OM5K-7375 - <a>https://dev.diamondkey.com/browse/OM5K-7375</a></p>
          <p>OM5K-7384 - <a>https://dev.diamondkey.com/browse/OM5K-7384</a></p>
          <p>OM5K-7385 - <a>https://dev.diamondkey.com/browse/OM5K-7385</a></p>
          <p>OM5K-7390 - <a>https://dev.diamondkey.com/browse/OM5K-7390</a></p>
          <p>OM5K-7409 - <a>https://dev.diamondkey.com/browse/OM5K-7409</a></p>
          <p>OM5K-7453 - <a>https://dev.diamondkey.com/browse/OM5K-7453</a></p>
          <p>OM5K-7475 - <a>https://dev.diamondkey.com/browse/OM5K-7475</a></p>
          <p>OM5K-7503 - <a>https://dev.diamondkey.com/browse/OM5K-7503</a></p>
          <p>OM5K-7506 - <a>https://dev.diamondkey.com/browse/OM5K-7506</a></p>
          <p>OM5K-7508 - <a>https://dev.diamondkey.com/browse/OM5K-7508</a></p>
          <p>OM5K-7524 - <a>https://dev.diamondkey.com/browse/OM5K-7524</a></p>
          <p>OM5K-7535 - <a>https://dev.diamondkey.com/browse/OM5K-7535</a></p>
          <p>OM5K-7545 - <a>https://dev.diamondkey.com/browse/OM5K-7545</a></p>
          <p>OM5K-6966 - <a>https://dev.diamondkey.com/browse/OM5K-6966</a></p>
          <p>OM5K-6969 - <a>https://dev.diamondkey.com/browse/OM5K-6969</a></p>
          <p>OM5K-7036 - <a>https://dev.diamondkey.com/browse/OM5K-7036</a></p>
          <p>OM5K-7383 - <a>https://dev.diamondkey.com/browse/OM5K-7383</a></p>
          <p>OM5K-7525 - <a>https://dev.diamondkey.com/browse/OM5K-7525</a></p>
        </>
      </>
    ),
  },
  {
    title: `Release Version Notes (10.1.3) - 23/07/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6697 - <a>https://dev.diamondkey.com/browse/OM5K-6697</a>
          </p>
          <p>
            OM5K-6698 - <a>https://dev.diamondkey.com/browse/OM5K-6698</a>
          </p>
          <p>
            OM5K-6699 - <a>https://dev.diamondkey.com/browse/OM5K-6699</a>
          </p>
          <p>
            OM5K-6717 - <a>https://dev.diamondkey.com/browse/OM5K-6717</a>
          </p>
          <p>
            OM5K-6723 - <a>https://dev.diamondkey.com/browse/OM5K-6723</a>
          </p>
          <p>
            OM5K-6725 - <a>https://dev.diamondkey.com/browse/OM5K-6725</a>
          </p>
          <p>
            OM5K-6726 - <a>https://dev.diamondkey.com/browse/OM5K-6726</a>
          </p>
          <p>
            OM5K-6750 - <a>https://dev.diamondkey.com/browse/OM5K-6750</a>
          </p>
          <p>
            OM5K-7163 - <a>https://dev.diamondkey.com/browse/OM5K-7163</a>
          </p>
          <p>
            OM5K-7192 - <a>https://dev.diamondkey.com/browse/OM5K-7192</a>
          </p>
          <p>
            OM5K-7209 - <a>https://dev.diamondkey.com/browse/OM5K-7209</a>
          </p>
          <p>
            OM5K-7242 - <a>https://dev.diamondkey.com/browse/OM5K-7242</a>
          </p>
          <p>
            OM5K-7038 - <a>https://dev.diamondkey.com/browse/OM5K-7038</a>
          </p>
          <p>
            OM5K-7170 - <a>https://dev.diamondkey.com/browse/OM5K-7170</a>
          </p>
          <p>
            OM5K-7190 - <a>https://dev.diamondkey.com/browse/OM5K-7190</a>
          </p>
          <p>
            OM5K-7197 - <a>https://dev.diamondkey.com/browse/OM5K-7197</a>
          </p>
          <p>
            OM5K-7198 - <a>https://dev.diamondkey.com/browse/OM5K-7198</a>
          </p>
          <p>
            OM5K-7234 - <a>https://dev.diamondkey.com/browse/OM5K-7234</a>
          </p>
          <p>
            OM5K-7183 - <a>https://dev.diamondkey.com/browse/OM5K-7183</a>
          </p>
          <p>
            OM5K-7186 - <a>https://dev.diamondkey.com/browse/OM5K-7186</a>
          </p>
          <p>
            OM5K-7187 - <a>https://dev.diamondkey.com/browse/OM5K-7187</a>
          </p>
          <p>
            OM5K-7188 - <a>https://dev.diamondkey.com/browse/OM5K-7188</a>
          </p>
          <p>
            OM5K-7184 - <a>https://dev.diamondkey.com/browse/OM5K-7184</a>
          </p>
          <p>
            OM5K-7185 - <a>https://dev.diamondkey.com/browse/OM5K-7185</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.1.2) - 16/07/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6575 - <a>https://dev.diamondkey.com/browse/OM5K-6575</a>
          </p>
          <p>
            OM5K-6640 - <a>https://dev.diamondkey.com/browse/OM5K-6640</a>
          </p>
          <p>
            OM5K-6734 - <a>https://dev.diamondkey.com/browse/OM5K-6734</a>
          </p>
          <p>
            OM5K-6751 - <a>https://dev.diamondkey.com/browse/OM5K-6751</a>
          </p>
          <p>
            OM5K-6603 - <a>https://dev.diamondkey.com/browse/OM5K-6603</a>
          </p>
          <p>
            OM5K-6605 - <a>https://dev.diamondkey.com/browse/OM5K-6605</a>
          </p>
          <p>
            OM5K-6606 - <a>https://dev.diamondkey.com/browse/OM5K-6606</a>
          </p>
          <p>
            OM5K-6999 - <a>https://dev.diamondkey.com/browse/OM5K-6999</a>
          </p>
          <p>
            OM5K-7011 - <a>https://dev.diamondkey.com/browse/OM5K-7011</a>
          </p>
          <p>
            OM5K-7119 - <a>https://dev.diamondkey.com/browse/OM5K-7119</a>
          </p>
          <p>
            OM5K-7126 - <a>https://dev.diamondkey.com/browse/OM5K-7126</a>
          </p>
          <p>
            OM5K-7133 - <a>https://dev.diamondkey.com/browse/OM5K-7133</a>
          </p>
          <p>
            OM5K-7139 - <a>https://dev.diamondkey.com/browse/OM5K-7139</a>
          </p>
          <p>
            OM5K-7148 - <a>https://dev.diamondkey.com/browse/OM5K-7148</a>
          </p>
          <p>
            OM5K-7150 - <a>https://dev.diamondkey.com/browse/OM5K-7150</a>
          </p>
          <p>
            OM5K-7152 - <a>https://dev.diamondkey.com/browse/OM5K-7152</a>
          </p>
          <p>
            OM5K-7156 - <a>https://dev.diamondkey.com/browse/OM5K-7156</a>
          </p>
          <p>
            OM5K-7048 - <a>https://dev.diamondkey.com/browse/OM5K-7048</a>
          </p>
          <p>
            OM5K-7098 - <a>https://dev.diamondkey.com/browse/OM5K-7098</a>
          </p>
          <p>
            OM5K-7130 - <a>https://dev.diamondkey.com/browse/OM5K-7130</a>
          </p>
          <p>
            OM5K-7162 - <a>https://dev.diamondkey.com/browse/OM5K-7162</a>
          </p>
          <p>
            OM5K-7097 - <a>https://dev.diamondkey.com/browse/OM5K-7097</a>
          </p>
          <p>
            OM5K-7101 - <a>https://dev.diamondkey.com/browse/OM5K-7101</a>
          </p>
          <p>
            OM5K-7151 - <a>https://dev.diamondkey.com/browse/OM5K-7151</a>
          </p>
          <p>
            OM5K-7157 - <a>https://dev.diamondkey.com/browse/OM5K-7157</a>
          </p>
          <p>
            OM5K-7158 - <a>https://dev.diamondkey.com/browse/OM5K-7158</a>
          </p>
          <p>
            OM5K-7066 - <a>https://dev.diamondkey.com/browse/OM5K-7066</a>
          </p>

          <p>
            OM5K-7167 - <a>https://dev.diamondkey.com/browse/OM5K-7167</a>
          </p>
          <p>
            OM5K-7012 - <a>https://dev.diamondkey.com/browse/OM5K-7012</a>
          </p>
          <p>
            OM5K-7138 - <a>https://dev.diamondkey.com/browse/OM5K-7138</a>
          </p>
          <p>
            OM5K-7168 - <a>https://dev.diamondkey.com/browse/OM5K-7168</a>
          </p>
          <p>
            OM5K-7077 - <a>https://dev.diamondkey.com/browse/OM5K-7077</a>
          </p>
          <p>
            OM5K-7083 - <a>https://dev.diamondkey.com/browse/OM5K-7083</a>
          </p>
          <p>
            OM5K-7102 - <a>https://dev.diamondkey.com/browse/OM5K-7102</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.1.1) - 14/07/2020`,
    content: (
      <>
        <>
          <Divider>Enhancements</Divider>

          <p>
            OM5K-7141 - <a>https://dev.diamondkey.com/browse/OM5K-7141</a>
          </p>
          <p>
            OM5K-7136 - <a>https://dev.diamondkey.com/browse/OM5K-7136</a>
          </p>
          <p>
            OM5K-7140 - <a>https://dev.diamondkey.com/browse/OM5K-7140</a>
          </p>
          <p>
            OM5K-7075 - <a>https://dev.diamondkey.com/browse/OM5K-7075</a>
          </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-7144 - <a>https://dev.diamondkey.com/browse/OM5K-7144</a>
          </p>
          <p>
            OM5K-7111 - <a>https://dev.diamondkey.com/browse/OM5K-7111</a>
          </p>
          <p>
            OM5K-7112 - <a>https://dev.diamondkey.com/browse/OM5K-7112</a>
          </p>
          <p>
            OM5K-7118 - <a>https://dev.diamondkey.com/browse/OM5K-7118</a>
          </p>
          <p>
            OM5K-7125 - <a>https://dev.diamondkey.com/browse/OM5K-7125</a>
          </p>
          <p>
            OM5K-7127 - <a>https://dev.diamondkey.com/browse/OM5K-7127</a>
          </p>
          <p>
            OM5K-7128 - <a>https://dev.diamondkey.com/browse/OM5K-7128</a>
          </p>
          <p>
            OM5K-7142 - <a>https://dev.diamondkey.com/browse/OM5K-7142</a>
          </p>
          <p>
            OM5K-7080 - <a>https://dev.diamondkey.com/browse/OM5K-7080</a>
          </p>
          <p>
            OM5K-7114 - <a>https://dev.diamondkey.com/browse/OM5K-7114</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.1.0) - 13/07/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>
            - Expired Session Handling is now done by telling the user their session has been expired and
            promotes them to logout.
          </p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Session Expiry Raised to 24 hours </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6778 - <a>https://dev.diamondkey.com/browse/OM5K-6778</a>
          </p>
          <p>
            OM5K-6914 - <a>https://dev.diamondkey.com/browse/OM5K-6914</a>
          </p>
          <p>
            OM5K-7031 - <a>https://dev.diamondkey.com/browse/OM5K-7031</a>
          </p>
          <p>
            OM5K-7063 - <a>https://dev.diamondkey.com/browse/OM5K-7063</a>
          </p>
          <p>
            OM5K-7086 - <a>https://dev.diamondkey.com/browse/OM5K-7086</a>
          </p>
          <p>
            OM5K-7087 - <a>https://dev.diamondkey.com/browse/OM5K-7087</a>
          </p>
          <p>
            OM5K-7104 - <a>https://dev.diamondkey.com/browse/OM5K-7104</a>
          </p>
          <p>
            OM5K-7105 - <a>https://dev.diamondkey.com/browse/OM5K-7105</a>
          </p>
          <p>
            OM5K-7106 - <a>https://dev.diamondkey.com/browse/OM5K-7106</a>
          </p>
          <p>
            OM5K-7108 - <a>https://dev.diamondkey.com/browse/OM5K-7108</a>
          </p>
          <p>
            OM5K-7110 - <a>https://dev.diamondkey.com/browse/OM5K-7110</a>
          </p>
          <p>
            OM5K-6625 - <a>https://dev.diamondkey.com/browse/OM5K-6625</a>
          </p>
          <p>
            OM5K-6633 - <a>https://dev.diamondkey.com/browse/OM5K-6633</a>
          </p>
          <p>
            OM5K-6646 - <a>https://dev.diamondkey.com/browse/OM5K-6646</a>
          </p>
          <p>
            OM5K-6752 - <a>https://dev.diamondkey.com/browse/OM5K-6752</a>
          </p>
          <p>
            OM5K-6755 - <a>https://dev.diamondkey.com/browse/OM5K-6755</a>
          </p>
          <p>
            OM5K-6940 - <a>https://dev.diamondkey.com/browse/OM5K-6940</a>
          </p>
          <p>
            OM5K-6946 - <a>https://dev.diamondkey.com/browse/OM5K-6946</a>
          </p>
          <p>
            OM5K-6980 - <a>https://dev.diamondkey.com/browse/OM5K-6980</a>
          </p>
          <p>
            OM5K-6997 - <a>https://dev.diamondkey.com/browse/OM5K-6997</a>
          </p>
          <p>
            OM5K-7003 - <a>https://dev.diamondkey.com/browse/OM5K-7003</a>
          </p>
          <p>
            OM5K-7016 - <a>https://dev.diamondkey.com/browse/OM5K-7016</a>
          </p>
          <p>
            OM5K-7017 - <a>https://dev.diamondkey.com/browse/OM5K-7017</a>
          </p>
          <p>
            OM5K-7018 - <a>https://dev.diamondkey.com/browse/OM5K-7018</a>
          </p>
          <p>
            OM5K-7026 - <a>https://dev.diamondkey.com/browse/OM5K-7026</a>
          </p>
          <p>
            OM5K-7027 - <a>https://dev.diamondkey.com/browse/OM5K-7027</a>
          </p>
          <p>
            OM5K-7032 - <a>https://dev.diamondkey.com/browse/OM5K-7032</a>
          </p>
          <p>
            OM5K-7033 - <a>https://dev.diamondkey.com/browse/OM5K-7033</a>
          </p>
          <p>
            OM5K-7040 - <a>https://dev.diamondkey.com/browse/OM5K-7040</a>
          </p>
          <p>
            OM5K-7052 - <a>https://dev.diamondkey.com/browse/OM5K-7052</a>
          </p>
          <p>
            OM5K-7053 - <a>https://dev.diamondkey.com/browse/OM5K-7053</a>
          </p>
          <p>
            OM5K-7056 - <a>https://dev.diamondkey.com/browse/OM5K-7056</a>
          </p>
          <p>
            OM5K-7060 - <a>https://dev.diamondkey.com/browse/OM5K-7060</a>
          </p>
          <p>
            OM5K-7061 - <a>https://dev.diamondkey.com/browse/OM5K-7061</a>
          </p>
          <p>
            OM5K-7062 - <a>https://dev.diamondkey.com/browse/OM5K-7062</a>
          </p>
          <p>
            OM5K-7065 - <a>https://dev.diamondkey.com/browse/OM5K-7065</a>
          </p>
          <p>
            OM5K-7070 - <a>https://dev.diamondkey.com/browse/OM5K-7070</a>
          </p>
          <p>
            OM5K-7082 - <a>https://dev.diamondkey.com/browse/OM5K-7082</a>
          </p>
          <p>
            OM5K-7084 - <a>https://dev.diamondkey.com/browse/OM5K-7084</a>
          </p>
          <p>
            OM5K-7093 - <a>https://dev.diamondkey.com/browse/OM5K-7093</a>
          </p>
          <p>
            OM5K-7099 - <a>https://dev.diamondkey.com/browse/OM5K-7099</a>
          </p>
          <p>
            OM5K-7111 - <a>https://dev.diamondkey.com/browse/OM5K-7111</a>
          </p>
          <p>
            OM5K-6715 - <a>https://dev.diamondkey.com/browse/OM5K-6715</a>
          </p>
          <p>
            OM5K-6733 - <a>https://dev.diamondkey.com/browse/OM5K-6733</a>
          </p>
          <p>
            OM5K-6775 - <a>https://dev.diamondkey.com/browse/OM5K-6775</a>
          </p>
          <p>
            OM5K-6781 - <a>https://dev.diamondkey.com/browse/OM5K-6781</a>
          </p>
          <p>
            OM5K-6798 - <a>https://dev.diamondkey.com/browse/OM5K-6798</a>
          </p>
          <p>
            OM5K-6799 - <a>https://dev.diamondkey.com/browse/OM5K-6799</a>
          </p>
          <p>
            OM5K-6944 - <a>https://dev.diamondkey.com/browse/OM5K-6944</a>
          </p>
          <p>
            OM5K-6947 - <a>https://dev.diamondkey.com/browse/OM5K-6947</a>
          </p>
          <p>
            OM5K-6954 - <a>https://dev.diamondkey.com/browse/OM5K-6954</a>
          </p>
          <p>
            OM5K-6996 - <a>https://dev.diamondkey.com/browse/OM5K-6996</a>
          </p>
          <p>
            OM5K-7013 - <a>https://dev.diamondkey.com/browse/OM5K-7013</a>
          </p>
          <p>
            OM5K-7054 - <a>https://dev.diamondkey.com/browse/OM5K-7054</a>
          </p>
          <p>
            OM5K-7055 - <a>https://dev.diamondkey.com/browse/OM5K-7055</a>
          </p>
          <p>
            OM5K-7081 - <a>https://dev.diamondkey.com/browse/OM5K-7081</a>
          </p>
          <p>
            OM5K-7100 - <a>https://dev.diamondkey.com/browse/OM5K-7100</a>
          </p>
          <p>
            OM5K-7115 - <a>https://dev.diamondkey.com/browse/OM5K-7115</a>
          </p>
          <p>
            OM5K-6730 - <a>https://dev.diamondkey.com/browse/OM5K-6730</a>
          </p>
          <p>
            OM5K-6731 - <a>https://dev.diamondkey.com/browse/OM5K-6731</a>
          </p>
          <p>
            OM5K-6851 - <a>https://dev.diamondkey.com/browse/OM5K-6851</a>
          </p>
          <p>
            OM5K-6951 - <a>https://dev.diamondkey.com/browse/OM5K-6951</a>
          </p>
          <p>
            OM5K-6972 - <a>https://dev.diamondkey.com/browse/OM5K-6972</a>
          </p>
          <p>
            OM5K-6988 - <a>https://dev.diamondkey.com/browse/OM5K-6988</a>
          </p>
          <p>
            OM5K-7034 - <a>https://dev.diamondkey.com/browse/OM5K-7034</a>
          </p>
          <p>
            OM5K-7035 - <a>https://dev.diamondkey.com/browse/OM5K-7035</a>
          </p>
          <p>
            OM5K-7037 - <a>https://dev.diamondkey.com/browse/OM5K-7037</a>
          </p>
          <p>
            OM5K-7069 - <a>https://dev.diamondkey.com/browse/OM5K-7069</a>
          </p>
          <p>
            OM5K-7076 - <a>https://dev.diamondkey.com/browse/OM5K-7076</a>
          </p>
          <p>
            OM5K-7077 - <a>https://dev.diamondkey.com/browse/OM5K-7077</a>
          </p>
          <p>
            OM5K-7029 - <a>https://dev.diamondkey.com/browse/OM5K-7029</a>
          </p>
          <p>
            OM5K-7072 - <a>https://dev.diamondkey.com/browse/OM5K-7072</a>
          </p>
          <p>
            OM5K-7078 - <a>https://dev.diamondkey.com/browse/OM5K-7078</a>
          </p>
          <p>
            OM5K-7079 - <a>https://dev.diamondkey.com/browse/OM5K-7079</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.16) - 07/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>
            OM5K-6981 - Drawer product Asset screen - Can not select the image by clicking it, User has to
            click on the name to select <a>https://dev.diamondkey.com/browse/OM5K-6981</a>
          </p>
          <p>
            OM5K-6989 - Journal Screen - The screen keep refreshing, it gives a flickering effect
            <a>https://dev.diamondkey.com/browse/OM5K-6989</a>
          </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6439 - <a>https://dev.diamondkey.com.browse/OM5K-6439</a>
          </p>
          <p>
            OM5K-6521 - <a>https://dev.diamondkey.combrowse/OM5K-6521</a>
          </p>
          <p>
            OM5K-7000 - <a>https://dev.diamondkey.com/browse/OM5K-7000</a>
          </p>
          <p>
            OM5K-7001 - <a>https://dev.diamondkey.com/browse/OM5K-7001</a>
          </p>
          <p>
            OM5K-7002 - <a>https://dev.diamondkey.com/browse/OM5K-7002</a>
          </p>
          <p>
            OM5K-7007 - <a>https://dev.diamondkey.com/browse/OM5K-7007</a>
          </p>
          <p>
            OM5K-6491 - <a>https://dev.diamondkey.com/browse/OM5K-6491</a>
          </p>
          <p>
            OM5K-6625 - <a>https://dev.diamondkey.com/browse/OM5K-6625</a>
          </p>
          <p>
            OM5K-6800 - <a>https://dev.diamondkey.com/browse/OM5K-6800</a>
          </p>
          <p>
            OM5K-6948 - <a>https://dev.diamondkey.com/browse/OM5K-6948</a>
          </p>
          <p>
            OM5K-6978 - <a>https://dev.diamondkey.com/browse/OM5K-6978</a>
          </p>
          <p>
            OM5K-7003 - <a>https://dev.diamondkey.com/browse/OM5K-7003</a>
          </p>
          <p>
            OM5K-7019 - <a>https://dev.diamondkey.com/browse/OM5K-7019</a>
          </p>
          <p>
            OM5K-7041 - <a>https://dev.diamondkey.com/browse/OM5K-7041</a>
          </p>
          <p>
            OM5K-7042 - <a>https://dev.diamondkey.com/browse/OM5K-7042</a>
          </p>
          <p>
            OM5K-7043 - <a>https://dev.diamondkey.com/browse/OM5K-7043</a>
          </p>
          <p>
            OM5K-6515 - <a>https://dev.diamondkey.com/browse/OM5K-6515</a>
          </p>
          <p>
            OM5K-6681 - <a>https://dev.diamondkey.com/browse/OM5K-6681</a>
          </p>
          <p>
            OM5K-6796 - <a>https://dev.diamondkey.com/browse/OM5K-6796</a>
          </p>
          <p>
            OM5K-6834 - <a>https://dev.diamondkey.com/browse/OM5K-6834</a>
          </p>
          <p>
            OM5K-6976 - <a>https://dev.diamondkey.com/browse/OM5K-6976</a>
          </p>
          <p>
            OM5K-6986 - <a>https://dev.diamondkey.com/browse/OM5K-6986</a>
          </p>
          <p>
            OM5K-6990 - <a>https://dev.diamondkey.com/browse/OM5K-6990</a>
          </p>
          <p>
            OM5K-6993 - <a>https://dev.diamondkey.com/browse/OM5K-6993</a>
          </p>
          <p>
            OM5K-6995 - <a>https://dev.diamondkey.com/browse/OM5K-6995</a>
          </p>
          <p>
            OM5K-7006 - <a>https://dev.diamondkey.com/browse/OM5K-7006</a>
          </p>
          <p>
            OM5K-7008 - <a>https://dev.diamondkey.com/browse/OM5K-7008</a>
          </p>
          <p>
            OM5K-7009 - <a>https://dev.diamondkey.com/browse/OM5K-7009</a>
          </p>
          <p>
            OM5K-7023 - <a>https://dev.diamondkey.com/browse/OM5K-7023</a>
          </p>
          <p>
            OM5K-7024 - <a>https://dev.diamondkey.com/browse/OM5K-7024</a>
          </p>
          <p>
            OM5K-7044 - <a>https://dev.diamondkey.com/browse/OM5K-7044</a>
          </p>
          <p>
            OM5K-7046 - <a>https://dev.diamondkey.com/browse/OM5K-7046</a>
          </p>
          <p>
            OM5K-7049 - <a>https://dev.diamondkey.com/browse/OM5K-7049</a>
          </p>
          <p>
            OM5K-6855 - <a>https://dev.diamondkey.com/browse/OM5K-6855</a>
          </p>
          <p>
            OM5K-6864 - <a>https://dev.diamondkey.com/browse/OM5K-6864</a>
          </p>
          <p>
            OM5K-6917 - <a>https://dev.diamondkey.com/browse/OM5K-6917</a>
          </p>
          <p>
            OM5K-6924 - <a>https://dev.diamondkey.com/browse/OM5K-6924</a>
          </p>
          <p>
            OM5K-6929 - <a>https://dev.diamondkey.com/browse/OM5K-6929</a>
          </p>
          <p>
            OM5K-6959 - <a>https://dev.diamondkey.com/browse/OM5K-6959</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.15) - 03/07/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>
        </>

        <>
          <Divider>Enhancements</Divider>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6836 - <a>https://dev.diamondkey.com/browse/OM5K-6836</a>
          </p>
          <p>
            OM5K-6961 - <a>https://dev.diamondkey.com/browse/OM5K-6961</a>
          </p>
          <p>
            OM5K-6975 - <a>https://dev.diamondkey.com/browse/OM5K-6975</a>
          </p>
          <p>
            OM5K-6982 - <a>https://dev.diamondkey.com/browse/OM5K-6982</a>
          </p>
          <p>
            OM5K-6687 - <a>https://dev.diamondkey.com/browse/OM5K-6687</a>
          </p>
          <p>
            OM5K-6838 - <a>https://dev.diamondkey.com/browse/OM5K-6838</a>
          </p>
          <p>
            OM5K-6857 - <a>https://dev.diamondkey.com/browse/OM5K-6857</a>
          </p>
          <p>
            OM5K-6861 - <a>https://dev.diamondkey.com/browse/OM5K-6861</a>
          </p>
          <p>
            OM5K-6915 - <a>https://dev.diamondkey.com/browse/OM5K-6915</a>
          </p>
          <p>
            OM5K-6956 - <a>https://dev.diamondkey.com/browse/OM5K-6956</a>
          </p>
          <p>
            OM5K-6960 - <a>https://dev.diamondkey.com/browse/OM5K-6960</a>
          </p>
          <p>
            OM5K-6965 - <a>https://dev.diamondkey.com/browse/OM5K-6965</a>
          </p>
          <p>
            OM5K-6983 - <a>https://dev.diamondkey.com/browse/OM5K-6983</a>
          </p>
          <p>
            OM5K-6655 - <a>https://dev.diamondkey.com/browse/OM5K-6655</a>
          </p>
          <p>
            OM5K-6689 - <a>https://dev.diamondkey.com/browse/OM5K-6689</a>
          </p>
          <p>
            OM5K-6783 - <a>https://dev.diamondkey.com/browse/OM5K-6783</a>
          </p>
          <p>
            OM5K-6865 - <a>https://dev.diamondkey.com/browse/OM5K-6865</a>
          </p>
          <p>
            OM5K-6930 - <a>https://dev.diamondkey.com/browse/OM5K-6930</a>
          </p>
          <p>
            OM5K-6949 - <a>https://dev.diamondkey.com/browse/OM5K-6949</a>
          </p>
          <p>
            OM5K-6950 - <a>https://dev.diamondkey.com/browse/OM5K-6950</a>
          </p>
          <p>
            OM5K-6952 - <a>https://dev.diamondkey.com/browse/OM5K-6952</a>
          </p>
          <p>
            OM5K-6955 - <a>https://dev.diamondkey.com/browse/OM5K-6955</a>
          </p>
          <p>
            OM5K-6958 - <a>https://dev.diamondkey.com/browse/OM5K-6958</a>
          </p>
          <p>
            OM5K-6863 - <a>https://dev.diamondkey.com/browse/OM5K-6863</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.14)- 29/06/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6447 - <a>https://dev.diamondkey.com/browse/OM5K-6447</a>
          </p>
          <p>
            OM5K-6769 - <a>https://dev.diamondkey.com/browse/OM5K-6769</a>
          </p>
          <p>
            OM5K-6771 - <a>https://dev.diamondkey.com/browse/OM5K-6771</a>
          </p>
          <p>
            OM5K-6939 - <a>https://dev.diamondkey.com/browse/OM5K-6939</a>
          </p>
          <p>
            OM5K-6448 - <a>https://dev.diamondkey.com/browse/OM5K-6448</a>
          </p>
          <p>
            OM5K-6491 - <a>https://dev.diamondkey.com/browse/OM5K-6491</a>
          </p>
          <p>
            OM5K-6625 - <a>https://dev.diamondkey.com/browse/OM5K-6625</a>
          </p>
          <p>
            OM5K-6633 - <a>https://dev.diamondkey.com/browse/OM5K-6633</a>
          </p>
          <p>
            OM5K-6646 - <a>https://dev.diamondkey.com/browse/OM5K-6646</a>
          </p>
          <p>
            OM5K-6671 - <a>https://dev.diamondkey.com/browse/OM5K-6671</a>
          </p>
          <p>
            OM5K-6672 - <a>https://dev.diamondkey.com/browse/OM5K-6672</a>
          </p>
          <p>
            OM5K-6688 - <a>https://dev.diamondkey.com/browse/OM5K-6688</a>
          </p>
          <p>
            OM5K-6706 - <a>https://dev.diamondkey.com/browse/OM5K-6706</a>
          </p>
          <p>
            OM5K-6709 - <a>https://dev.diamondkey.com/browse/OM5K-6709</a>
          </p>
          <p>
            OM5K-6712 - <a>https://dev.diamondkey.com/browse/OM5K-6712</a>
          </p>
          <p>
            OM5K-6714 - <a>https://dev.diamondkey.com/browse/OM5K-6714</a>
          </p>
          <p>
            OM5K-6724 - <a>https://dev.diamondkey.com/browse/OM5K-6724</a>
          </p>
          <p>
            OM5K-6735 - <a>https://dev.diamondkey.com/browse/OM5K-6735</a>
          </p>
          <p>
            OM5K-6738 - <a>https://dev.diamondkey.com/browse/OM5K-6738</a>
          </p>
          <p>
            OM5K-6745 - <a>https://dev.diamondkey.com/browse/OM5K-6745</a>
          </p>
          <p>
            OM5K-6754 - <a>https://dev.diamondkey.com/browse/OM5K-6754</a>
          </p>
          <p>
            OM5K-6755 - <a>https://dev.diamondkey.com/browse/OM5K-6755</a>
          </p>
          <p>
            OM5K-6759 - <a>https://dev.diamondkey.com/browse/OM5K-6759</a>
          </p>
          <p>
            OM5K-6760 - <a>https://dev.diamondkey.com/browse/OM5K-6760</a>
          </p>
          <p>
            OM5K-6761 - <a>https://dev.diamondkey.com/browse/OM5K-6761</a>
          </p>
          <p>
            OM5K-6770 - <a>https://dev.diamondkey.com/browse/OM5K-6770</a>
          </p>
          <p>
            OM5K-6777 - <a>https://dev.diamondkey.com/browse/OM5K-6777</a>
          </p>
          <p>
            OM5K-6779 - <a>https://dev.diamondkey.com/browse/OM5K-6779</a>
          </p>
          <p>
            OM5K-6784 - <a>https://dev.diamondkey.com/browse/OM5K-6784</a>
          </p>
          <p>
            OM5K-6785 - <a>https://dev.diamondkey.com/browse/OM5K-6785</a>
          </p>
          <p>
            OM5K-6787 - <a>https://dev.diamondkey.com/browse/OM5K-6787</a>
          </p>
          <p>
            OM5K-6793 - <a>https://dev.diamondkey.com/browse/OM5K-6793</a>
          </p>
          <p>
            OM5K-6795 - <a>https://dev.diamondkey.com/browse/OM5K-6795</a>
          </p>
          <p>
            OM5K-6801 - <a>https://dev.diamondkey.com/browse/OM5K-6801</a>
          </p>
          <p>
            OM5K-6837 - <a>https://dev.diamondkey.com/browse/OM5K-6837</a>
          </p>
          <p>
            OM5K-6839 - <a>https://dev.diamondkey.com/browse/OM5K-6839</a>
          </p>
          <p>
            OM5K-6840 - <a>https://dev.diamondkey.com/browse/OM5K-6840</a>
          </p>
          <p>
            OM5K-6841 - <a>https://dev.diamondkey.com/browse/OM5K-6841</a>
          </p>
          <p>
            OM5K-6842 - <a>https://dev.diamondkey.com/browse/OM5K-6842</a>
          </p>
          <p>
            OM5K-6843 - <a>https://dev.diamondkey.com/browse/OM5K-6843</a>
          </p>
          <p>
            OM5K-6862 - <a>https://dev.diamondkey.com/browse/OM5K-6862</a>
          </p>
          <p>
            OM5K-6921 - <a>https://dev.diamondkey.com/browse/OM5K-6921</a>
          </p>
          <p>
            OM5K-6932 - <a>https://dev.diamondkey.com/browse/OM5K-6932</a>
          </p>
          <p>
            OM5K-6372 - <a>https://dev.diamondkey.com/browse/OM5K-6372</a>
          </p>
          <p>
            OM5K-6543 - <a>https://dev.diamondkey.com/browse/OM5K-6543</a>
          </p>
          <p>
            OM5K-6663 - <a>https://dev.diamondkey.com/browse/OM5K-6663</a>
          </p>
          <p>
            OM5K-6719 - <a>https://dev.diamondkey.com/browse/OM5K-6719</a>
          </p>
          <p>
            OM5K-6733 - <a>https://dev.diamondkey.com/browse/OM5K-6733</a>
          </p>
          <p>
            OM5K-6764 - <a>https://dev.diamondkey.com/browse/OM5K-6764</a>
          </p>
          <p>
            OM5K-6766 - <a>https://dev.diamondkey.com/browse/OM5K-6766</a>
          </p>
          <p>
            OM5K-6767 - <a>https://dev.diamondkey.com/browse/OM5K-6767</a>
          </p>
          <p>
            OM5K-6768 - <a>https://dev.diamondkey.com/browse/OM5K-6768</a>
          </p>
          <p>
            OM5K-6772 - <a>https://dev.diamondkey.com/browse/OM5K-6772</a>
          </p>
          <p>
            OM5K-6774 - <a>https://dev.diamondkey.com/browse/OM5K-6774</a>
          </p>
          <p>
            OM5K-6775 - <a>https://dev.diamondkey.com/browse/OM5K-6775</a>
          </p>
          <p>
            OM5K-6776 - <a>https://dev.diamondkey.com/browse/OM5K-6776</a>
          </p>
          <p>
            OM5K-6780 - <a>https://dev.diamondkey.com/browse/OM5K-6780</a>
          </p>
          <p>
            OM5K-6789 - <a>https://dev.diamondkey.com/browse/OM5K-6789</a>
          </p>
          <p>
            OM5K-6790 - <a>https://dev.diamondkey.com/browse/OM5K-6790</a>
          </p>
          <p>
            OM5K-6792 - <a>https://dev.diamondkey.com/browse/OM5K-6792</a>
          </p>
          <p>
            OM5K-6794 - <a>https://dev.diamondkey.com/browse/OM5K-6794</a>
          </p>
          <p>
            OM5K-6844 - <a>https://dev.diamondkey.com/browse/OM5K-6844</a>
          </p>
          <p>
            OM5K-6854 - <a>https://dev.diamondkey.com/browse/OM5K-6854</a>
          </p>
          <p>
            OM5K-6904 - <a>https://dev.diamondkey.com/browse/OM5K-6904</a>
          </p>
          <p>
            OM5K-6748 - <a>https://dev.diamondkey.com/browse/OM5K-6748</a>
          </p>
          <p>
            OM5K-6788 - <a>https://dev.diamondkey.com/browse/OM5K-6788</a>
          </p>
          <p>
            OM5K-6802 - <a>https://dev.diamondkey.com/browse/OM5K-6802</a>
          </p>
          <p>
            OM5K-6803 - <a>https://dev.diamondkey.com/browse/OM5K-6803</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.13) - 23/06/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6747- <a>https://dev.diamondkey.com/browse/OM5K-6747</a>
          </p>

          <p>
            OM5K-6746 - <a>https://dev.diamondkey.com/browse/OM5K-6746</a>
          </p>

          <p>
            OM5K-6743 - <a>https://dev.diamondkey.com/browse/OM5K-6743</a>
          </p>

          <p>
            OM5K-6310 - <a>https://dev.diamondkey.com/browse/OM5K-6310</a>
          </p>
          <p>
            OM5K-6640 - <a>https://dev.diamondkey.com/browse/OM5K-6640</a>
          </p>
          <p>
            OM5K-6697 - <a>https://dev.diamondkey.com/browse/OM5K-6697</a>
          </p>
          <p>
            OM5K-6698 - <a>https://dev.diamondkey.com/browse/OM5K-6698</a>
          </p>
          <p>
            OM5K-6699 - <a>https://dev.diamondkey.com/browse/OM5K-6699</a>
          </p>
          <p>
            OM5K-6739 - <a>https://dev.diamondkey.com/browse/OM5K-6739</a>
          </p>
          <p>
            OM5K-6751 - <a>https://dev.diamondkey.com/browse/OM5K-6751</a>
          </p>
          <p>
            OM5K-6316 - <a>https://dev.diamondkey.com/browse/OM5K-6316</a>
          </p>
          <p>
            OM5K-6468 - <a>https://dev.diamondkey.com/browse/OM5K-6468</a>
          </p>
          <p>
            OM5K-6487 - <a>https://dev.diamondkey.com/browse/OM5K-6487</a>
          </p>
          <p>
            OM5K-6593 - <a>https://dev.diamondkey.com/browse/OM5K-6593</a>
          </p>
          <p>
            OM5K-6594 - <a>https://dev.diamondkey.com/browse/OM5K-6594</a>
          </p>
          <p>
            OM5K-6596 - <a>https://dev.diamondkey.com/browse/OM5K-6596</a>
          </p>
          <p>
            OM5K-6608 - <a>https://dev.diamondkey.com/browse/OM5K-6608</a>
          </p>
          <p>
            OM5K-6613 - <a>https://dev.diamondkey.com/browse/OM5K-6613</a>
          </p>
          <p>
            OM5K-6622 - <a>https://dev.diamondkey.com/browse/OM5K-6622</a>
          </p>
          <p>
            OM5K-6633 - <a>https://dev.diamondkey.com/browse/OM5K-6633</a>
          </p>
          <p>
            OM5K-6634 - <a>https://dev.diamondkey.com/browse/OM5K-6634</a>
          </p>
          <p>
            OM5K-6635 - <a>https://dev.diamondkey.com/browse/OM5K-6635</a>
          </p>
          <p>
            OM5K-6638 - <a>https://dev.diamondkey.com/browse/OM5K-6638</a>
          </p>
          <p>
            OM5K-6639 - <a>https://dev.diamondkey.com/browse/OM5K-6639</a>
          </p>
          <p>
            OM5K-6643 - <a>https://dev.diamondkey.com/browse/OM5K-6643</a>
          </p>
          <p>
            OM5K-6646 - <a>https://dev.diamondkey.com/browse/OM5K-6646</a>
          </p>
          <p>
            OM5K-6656 - <a>https://dev.diamondkey.com/browse/OM5K-6656</a>
          </p>
          <p>
            OM5K-6668 - <a>https://dev.diamondkey.com/browse/OM5K-6668</a>
          </p>
          <p>
            OM5K-6693 - <a>https://dev.diamondkey.com/browse/OM5K-6693</a>
          </p>
          <p>
            OM5K-6695 - <a>https://dev.diamondkey.com/browse/OM5K-6695</a>
          </p>
          <p>
            OM5K-6704 - <a>https://dev.diamondkey.com/browse/OM5K-6704</a>
          </p>
          <p>
            OM5K-6710 - <a>https://dev.diamondkey.com/browse/OM5K-6710</a>
          </p>
          <p>
            OM5K-6714 - <a>https://dev.diamondkey.com/browse/OM5K-6714</a>
          </p>
          <p>
            OM5K-6721 - <a>https://dev.diamondkey.com/browse/OM5K-6721</a>
          </p>
          <p>
            OM5K-6724 - <a>https://dev.diamondkey.com/browse/OM5K-6724</a>
          </p>
          <p>
            OM5K-6737 - <a>https://dev.diamondkey.com/browse/OM5K-6737</a>
          </p>
          <p>
            OM5K-6742 - <a>https://dev.diamondkey.com/browse/OM5K-6742</a>
          </p>
          <p>
            OM5K-6744 - <a>https://dev.diamondkey.com/browse/OM5K-6744</a>
          </p>
          <p>
            OM5K-6745 - <a>https://dev.diamondkey.com/browse/OM5K-6745</a>
          </p>
          <p>
            OM5K-6464 - <a>https://dev.diamondkey.com/browse/OM5K-6464</a>
          </p>
          <p>
            OM5K-6492 - <a>https://dev.diamondkey.com/browse/OM5K-6492</a>
          </p>
          <p>
            OM5K-6505 - <a>https://dev.diamondkey.com/browse/OM5K-6505</a>
          </p>
          <p>
            OM5K-6648 - <a>https://dev.diamondkey.com/browse/OM5K-6648</a>
          </p>
          <p>
            OM5K-6650 - <a>https://dev.diamondkey.com/browse/OM5K-6650</a>
          </p>
          <p>
            OM5K-6653 - <a>https://dev.diamondkey.com/browse/OM5K-6653</a>
          </p>
          <p>
            OM5K-6654 - <a>https://dev.diamondkey.com/browse/OM5K-6654</a>
          </p>
          <p>
            OM5K-6659 - <a>https://dev.diamondkey.com/browse/OM5K-6659</a>
          </p>
          <p>
            OM5K-6660 - <a>https://dev.diamondkey.com/browse/OM5K-6660</a>
          </p>
          <p>
            OM5K-6661 - <a>https://dev.diamondkey.com/browse/OM5K-6661</a>
          </p>
          <p>
            OM5K-6684 - <a>https://dev.diamondkey.com/browse/OM5K-6684</a>
          </p>
          <p>
            OM5K-6715 - <a>https://dev.diamondkey.com/browse/OM5K-6715</a>
          </p>
          <p>
            OM5K-6736 - <a>https://dev.diamondkey.com/browse/OM5K-6736</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.12) - 19/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Manual Transaction Completion</p>

          <p>Links from Order Listings to Manual Transactions</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Versioning </p>

          <p>Links from Customers to Order Listings with parameters</p>

          <p>Links from Customers to Delivery Locations with parameters</p>

          <p>Manage Address Templates in Addresses</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p>
            OM5K-6652 - <a>https://dev.diamondkey.com/browse/OM5K-6652</a>
          </p>
          <p>
            OM5K-6705 - <a>https://dev.diamondkey.com/browse/OM5K-6705</a>
          </p>
          <p>
            OM5K-6708 - <a>https://dev.diamondkey.com/browse/OM5K-6708</a>
          </p>

          <p>
            OM5K-6455 - <a>https://dev.diamondkey.com/browse/OM5K-6455</a>
          </p>
          <p>
            OM5K-6471 - <a>https://dev.diamondkey.com/browse/OM5K-6471</a>
          </p>
          <p>
            OM5K-6472 - <a>https://dev.diamondkey.com/browse/OM5K-6472</a>
          </p>
          <p>
            OM5K-6473 - <a>https://dev.diamondkey.com/browse/OM5K-6473</a>
          </p>
          <p>
            OM5K-6493 - <a>https://dev.diamondkey.com/browse/OM5K-6493</a>
          </p>
          <p>
            OM5K-6497 - <a>https://dev.diamondkey.com/browse/OM5K-6497</a>
          </p>
          <p>
            OM5K-6499 - <a>https://dev.diamondkey.com/browse/OM5K-6499</a>
          </p>
          <p>
            OM5K-6508 - <a>https://dev.diamondkey.com/browse/OM5K-6508</a>
          </p>
          <p>
            OM5K-6533 - <a>https://dev.diamondkey.com/browse/OM5K-6533</a>
          </p>
          <p>
            OM5K-6535 - <a>https://dev.diamondkey.com/browse/OM5K-6535</a>
          </p>
          <p>
            OM5K-6536 - <a>https://dev.diamondkey.com/browse/OM5K-6536</a>
          </p>
          <p>
            OM5K-6537 - <a>https://dev.diamondkey.com/browse/OM5K-6537</a>
          </p>
          <p>
            OM5K-6538 - <a>https://dev.diamondkey.com/browse/OM5K-6538</a>
          </p>
          <p>
            OM5K-6553 - <a>https://dev.diamondkey.com/browse/OM5K-6553</a>
          </p>
          <p>
            OM5K-6554 - <a>https://dev.diamondkey.com/browse/OM5K-6554</a>
          </p>
          <p>
            OM5K-6555 - <a>https://dev.diamondkey.com/browse/OM5K-6555</a>
          </p>
          <p>
            OM5K-6558 - <a>https://dev.diamondkey.com/browse/OM5K-6558</a>
          </p>
          <p>
            OM5K-6562 - <a>https://dev.diamondkey.com/browse/OM5K-6562</a>
          </p>
          <p>
            OM5K-6563 - <a>https://dev.diamondkey.com/browse/OM5K-6563</a>
          </p>

          <p>
            OM5K-6669 - <a>https://dev.diamondkey.com/browse/OM5K-6669</a>
          </p>

          <p>
            OM5K-6692 - <a>https://dev.diamondkey.com/browse/OM5K-6692</a>
          </p>

          <p>
            OM5K-6683 - <a>https://dev.diamondkey.com/browse/OM5K-6683</a>
          </p>

          <p>
            OM5K-6682 - <a>https://dev.diamondkey.com/browse/OM5K-6682</a>
          </p>

          <p>
            OM5K-6677 - <a>https://dev.diamondkey.com/browse/OM5K-6677</a>
          </p>

          <p>
            OM5K-6674 - <a>https://dev.diamondkey.com/browse/OM5K-6674</a>
          </p>

          <p>
            OM5K-6673 - <a>https://dev.diamondkey.com/browse/OM5K-6673</a>
          </p>

          <p>
            OM5K-6672 - <a>https://dev.diamondkey.com/browse/OM5K-6672</a>
          </p>

          <p>
            OM5K-6670 - <a>https://dev.diamondkey.com/browse/OM5K-6670</a>
          </p>

          <p>
            OM5K-6670 - <a>https://dev.diamondkey.com/browse/OM5K-6670</a>
          </p>

          <p>
            OM5K-6667 - <a>https://dev.diamondkey.com/browse/OM5K-6667</a>
          </p>

          <p>
            OM5K-6666 - <a>https://dev.diamondkey.com/browse/OM5K-6666</a>
          </p>

          <p>
            OM5K-6664 - <a>https://dev.diamondkey.com/browse/OM5K-6664</a>
          </p>

          <p>
            OM5K-6664 - <a>https://dev.diamondkey.com/browse/OM5K-6664</a>
          </p>

          <p>
            OM5K-6647 - <a>https://dev.diamondkey.com/browse/OM5K-6647</a>
          </p>

          <p>
            OM5K-6647 - <a>https://dev.diamondkey.com/browse/OM5K-6647</a>
          </p>

          <p>
            OM5K-6516 - <a>https://dev.diamondkey.com/browse/OM5K-6516</a>
          </p>

          <p>
            OM5K-6512 - <a>https://dev.diamondkey.com/browse/OM5K-6512</a>
          </p>

          <p>
            OM5K-6511 - <a>https://dev.diamondkey.com/browse/OM5K-6511</a>
          </p>

          <p>
            OM5K-6510 - <a>https://dev.diamondkey.com/browse/OM5K-6510</a>
          </p>

          <p>
            OM5K-6510 - <a>https://dev.diamondkey.com/browse/OM5K-6510</a>
          </p>

          <p>
            OM5K-6533 - <a>https://dev.diamondkey.com/browse/OM5K-6533</a>
          </p>
          <p>
            OM5K-6518 - <a>https://dev.diamondkey.com/browse/OM5K-6518</a>
          </p>
          <p>
            OM5K-6517 - <a>https://dev.diamondkey.com/browse/OM5K-6517</a>
          </p>
          <p>
            OM5K-6516 - <a>https://dev.diamondkey.com/browse/OM5K-6516</a>
          </p>
          <p>
            OM5K-6514 - <a>https://dev.diamondkey.com/browse/OM5K-6514</a>
          </p>
          <p>
            OM5K-6512 - <a>https://dev.diamondkey.com/browse/OM5K-6512</a>
          </p>
          <p>
            OM5K-6511 - <a>https://dev.diamondkey.com/browse/OM5K-6511</a>
          </p>
          <p>
            OM5K-6510 - <a>https://dev.diamondkey.com/browse/OM5K-6510</a>
          </p>
          <p>
            OM5K-6509 - <a>https://dev.diamondkey.com/browse/OM5K-6509</a>
          </p>
          <p>
            OM5K-6508 - <a>https://dev.diamondkey.com/browse/OM5K-6508</a>
          </p>
          <p>
            OM5K-6507 - <a>https://dev.diamondkey.com/browse/OM5K-6507</a>
          </p>
          <p>
            OM5K-6506 - <a>https://dev.diamondkey.com/browse/OM5K-6506</a>
          </p>
          <p>
            OM5K-6504 - <a>https://dev.diamondkey.com/browse/OM5K-6504</a>
          </p>
          <p>
            OM5K-6503 - <a>https://dev.diamondkey.com/browse/OM5K-6503</a>
          </p>
          <p>
            OM5K-6502 - <a>https://dev.diamondkey.com/browse/OM5K-6502</a>
          </p>
          <p>
            OM5K-6501 - <a>https://dev.diamondkey.com/browse/OM5K-6501</a>
          </p>
          <p>
            OM5K-6500 - <a>https://dev.diamondkey.com/browse/OM5K-6500</a>
          </p>
          <p>
            OM5K-6499 - <a>https://dev.diamondkey.com/browse/OM5K-6499</a>
          </p>
          <p>
            OM5K-6498 - <a>https://dev.diamondkey.com/browse/OM5K-6498</a>
          </p>
          <p>
            OM5K-6497 - <a>https://dev.diamondkey.com/browse/OM5K-6497</a>
          </p>
          <p>
            OM5K-6495 - <a>https://dev.diamondkey.com/browse/OM5K-6495</a>
          </p>
          <p>
            OM5K-6493 - <a>https://dev.diamondkey.com/browse/OM5K-6493</a>
          </p>
          <p>
            OM5K-6488 - <a>https://dev.diamondkey.com/browse/OM5K-6488</a>
          </p>
          <p>
            OM5K-6486 - <a>https://dev.diamondkey.com/browse/OM5K-6486</a>
          </p>
          <p>
            OM5K-6478 - <a>https://dev.diamondkey.com/browse/OM5K-6478</a>
          </p>
          <p>
            OM5K-6477 - <a>https://dev.diamondkey.com/browse/OM5K-6477</a>
          </p>
          <p>
            OM5K-6476 - <a>https://dev.diamondkey.com/browse/OM5K-6476</a>
          </p>

          <p>
            OM5K-6475 - <a>https://dev.diamondkey.com/browse/OM5K-6475</a>
          </p>
          <p>
            OM5K-6473 - <a>https://dev.diamondkey.com/browse/OM5K-6473</a>
          </p>
          <p>
            OM5K-6472 - <a>https://dev.diamondkey.com/browse/OM5K-6472</a>
          </p>
          <p>
            OM5K-6471 - <a>https://dev.diamondkey.com/browse/OM5K-6471</a>
          </p>
          <p>
            OM5K-6470 - <a>https://dev.diamondkey.com/browse/OM5K-6470</a>
          </p>
          <p>
            OM5K-6467 - <a>https://dev.diamondkey.com/browse/OM5K-6467</a>
          </p>
          <p>
            OM5K-6465 - <a>https://dev.diamondkey.com/browse/OM5K-6465</a>
          </p>
          <p>
            OM5K-6462 - <a>https://dev.diamondkey.com/browse/OM5K-6462</a>
          </p>
          <p>
            OM5K-6461 - <a>https://dev.diamondkey.com/browse/OM5K-6461</a>
          </p>
          <p>
            OM5K-6460 - <a>https://dev.diamondkey.com/browse/OM5K-6460</a>
          </p>
          <p>
            OM5K-6459 - <a>https://dev.diamondkey.com/browse/OM5K-6459</a>
          </p>
          <p>
            OM5K-6455 - <a>https://dev.diamondkey.com/browse/OM5K-6455</a>
          </p>
          <p>
            OM5K-6447 - <a>https://dev.diamondkey.com/browse/OM5K-6447</a>
          </p>
          <p>
            OM5K-6446 - <a>https://dev.diamondkey.com/browse/OM5K-6446</a>
          </p>
          <p>
            OM5K-6445 - <a>https://dev.diamondkey.com/browse/OM5K-6445</a>
          </p>
          <p>
            OM5K-6442 - <a>https://dev.diamondkey.com/browse/OM5K-6442</a>
          </p>
          <p>
            OM5K-6372 - <a>https://dev.diamondkey.com/browse/OM5K-6372</a>
          </p>
          <p>
            OM5K-6370 - <a>https://dev.diamondkey.com/browse/OM5K-6370</a>
          </p>
          <p>
            OM5K-6369 - <a>https://dev.diamondkey.com/browse/OM5K-6369</a>
          </p>
          <p>
            OM5K-6368 - <a>https://dev.diamondkey.com/browse/OM5K-6368</a>
          </p>
          <p>
            OM5K-6366 - <a>https://dev.diamondkey.com/browse/OM5K-6366</a>
          </p>
          <p>
            OM5K-6365 - <a>https://dev.diamondkey.com/browse/OM5K-6365</a>
          </p>
          <p>
            OM5K-6362 - <a>https://dev.diamondkey.com/browse/OM5K-6362</a>
          </p>
          <p>
            OM5K-6361 - <a>https://dev.diamondkey.com/browse/OM5K-6361</a>
          </p>
          <p>
            OM5K-6357 - <a>https://dev.diamondkey.com/browse/OM5K-6357</a>
          </p>
          <p>
            OM5K-6355 - <a>https://dev.diamondkey.com/browse/OM5K-6355</a>
          </p>
          <p>
            OM5K-6353 - <a>https://dev.diamondkey.com/browse/OM5K-6353</a>
          </p>
          <p>
            OM5K-6344 - <a>https://dev.diamondkey.com/browse/OM5K-6344</a>
          </p>
          <p>
            OM5K-6342 - <a>https://dev.diamondkey.com/browse/OM5K-6342</a>
          </p>
          <p>
            OM5K-6340 - <a>https://dev.diamondkey.com/browse/OM5K-6340</a>
          </p>
          <p>
            OM5K-6339 - <a>https://dev.diamondkey.com/browse/OM5K-6339</a>
          </p>
          <p>
            OM5K-6337 - <a>https://dev.diamondkey.com/browse/OM5K-6337</a>
          </p>
          <p>
            OM5K-6325 - <a>https://dev.diamondkey.com/browse/OM5K-6325</a>
          </p>
          <p>
            OM5K-6311 - <a>https://dev.diamondkey.com/browse/OM5K-6311</a>
          </p>
          <p>
            OM5K-6309 - <a>https://dev.diamondkey.com/browse/OM5K-6309</a>
          </p>
          <p>
            OM5K-6308 - <a>https://dev.diamondkey.com/browse/OM5K-6308</a>
          </p>
          <p>
            OM5K-6290 - <a>https://dev.diamondkey.com/browse/OM5K-6290</a>
          </p>
          <p>
            OM5K-6189 - <a>https://dev.diamondkey.com/browse/OM5K-6189</a>
          </p>
          <p>
            OM5K-6123 - <a>https://dev.diamondkey.com/browse/OM5K-6123</a>
          </p>
          <p>
            OM5K-6119 - <a>https://dev.diamondkey.com/browse/OM5K-6119</a>
          </p>
          <p>
            OM5K-6116 - <a>https://dev.diamondkey.com/browse/OM5K-6116</a>
          </p>
          <p>
            OM5K-6108 - <a>https://dev.diamondkey.com/browse/OM5K-6108</a>
          </p>
          <p>
            OM5K-6096 - <a>https://dev.diamondkey.com/browse/OM5K-6096</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: ` Release Version Notes (10.0.11-dev) - 15/06/2020`,
    content: (
      <>
        <>
          <Divider>Bug Fixes</Divider>
          <p>
            OM5K-6311 - <a>https://dev.diamondkey.com/browse/OM5K-6311</a>
          </p>
          <p>
            OM5K-6598 - <a>https://dev.diamondkey.com/browse/OM5K-6598</a>
          </p>
          <p>
            OM5K-6197 - <a>https://dev.diamondkey.com/browse/OM5K-6197</a>
          </p>
          <p>
            OM5K-6456 - <a>https://dev.diamondkey.com/browse/OM5K-6456</a>
          </p>
          <p>
            OM5K-6491 - <a>https://dev.diamondkey.com/browse/OM5K-6491</a>
          </p>
          <p>
            OM5K-6125 - <a>https://dev.diamondkey.com/browse/OM5K-6125</a>
          </p>
          <p>
            OM5K-6500 - <a>https://dev.diamondkey.com/browse/OM5K-6500</a>
          </p>
          <p>
            OM5K-6507 - <a>https://dev.diamondkey.com/browse/OM5K-6507</a>
          </p>
          <p>
            OM5K-6478 - <a>https://dev.diamondkey.com/browse/OM5K-6478</a>
          </p>
          <p>
            OM5K-6498 - <a>https://dev.diamondkey.com/browse/OM5K-6498</a>
          </p>
          <p>
            OM5K-6637 - <a>https://dev.diamondkey.com/browse/OM5K-6637</a>
          </p>
          <p>
            OM5K-6470 - <a>https://dev.diamondkey.com/browse/OM5K-6470</a>
          </p>
          <p>
            OM5K-6461 - <a>https://dev.diamondkey.com/browse/OM5K-6461</a>
          </p>
          <p>
            OM5K-6461 - <a>https://dev.diamondkey.com/browse/OM5K-6461</a>
          </p>
          <p>
            OM5K-6640 - <a>https://dev.diamondkey.com/browse/OM5K-6640</a>
          </p>
          <p>
            OM5K-6620 - <a>https://dev.diamondkey.com/browse/OM5K-6620</a>
          </p>
          <p>
            OM5K-6325 - <a>https://dev.diamondkey.com/browse/OM5K-6325</a>
          </p>
          <p>
            OM5K-6626 - <a>https://dev.diamondkey.com/browse/OM5K-6626</a>
          </p>
          <p>
            OM5K-6305 - <a>https://dev.diamondkey.com/browse/OM5K-6305</a>
          </p>
          <p>
            OM5K-6372 - <a>https://dev.diamondkey.com/browse/OM5K-6372</a>
          </p>
          <p>
            OM5K-6510 - <a>https://dev.diamondkey.com/browse/OM5K-6510</a>
          </p>
          <p>
            OM5K-6108 - <a>https://dev.diamondkey.com/browse/OM5K-6108</a>
          </p>
          <p>
            OM5K-6445 - <a>https://dev.diamondkey.com/browse/OM5K-6445</a>
          </p>
          <p>
            OM5K-6486 - <a>https://dev.diamondkey.com/browse/OM5K-6486</a>
          </p>
          <p>
            OM5K-6315 - <a>https://dev.diamondkey.com/browse/OM5K-6315</a>
          </p>
          <p>
            OM5K-6369 - <a>https://dev.diamondkey.com/browse/OM5K-6369</a>
          </p>
          <p>
            OM5K-6611 - <a>https://dev.diamondkey.com/browse/OM5K-6611</a>
          </p>

          <p>
            OM5K-6454 - <a>https://dev.diamondkey.com/browse/OM5K-6454</a>
          </p>

          <p>
            OM5K-6342 - <a>https://dev.diamondkey.com/browse/OM5K-6342</a>
          </p>

          <p>
            OM5K-6371 - <a>https://dev.diamondkey.com/browse/OM5K-6371</a>
          </p>

          <p>
            OM5K-6518 - <a>https://dev.diamondkey.com/browse/OM5K-6518</a>
          </p>

          <p>
            OM5K-6197 - <a>https://dev.diamondkey.com/browse/OM5K-6197</a>
          </p>

          <p>
            OM5K-6631 - <a>https://dev.diamondkey.com/browse/OM5K-6631</a>
          </p>

          <p>
            OM5K-6629 - <a>https://dev.diamondkey.com/browse/OM5K-6629</a>
          </p>

          <p>
            OM5K-6195 - <a>https://dev.diamondkey.com/browse/OM5K-6195</a>
          </p>

          <p>
            OM5K-6612 - <a>https://dev.diamondkey.com/browse/OM5K-6612</a>
          </p>

          <p>
            OM5K-6647 - <a>https://dev.diamondkey.com/browse/OM5K-6647</a>
          </p>

          <p>
            OM5K-6621 - <a>https://dev.diamondkey.com/browse/OM5K-6621</a>
          </p>

          <p>
            OM5K-6628 - <a>https://dev.diamondkey.com/browse/OM5K-6628</a>
          </p>

          <p>
            OM5K-6599 - <a>https://dev.diamondkey.com/browse/OM5K-6599</a>
          </p>

          <p>
            OM5K-6597 - <a>https://dev.diamondkey.com/browse/OM5K-6597</a>
          </p>

          <p>
            OM5K-6607 - <a>https://dev.diamondkey.com/browse/OM5K-6607</a>
          </p>

          <p>
            OM5K-6609 - <a>https://dev.diamondkey.com/browse/OM5K-6609</a>
          </p>

          <p>
            OM5K-6610 - <a>https://dev.diamondkey.com/browse/OM5K-6610</a>
          </p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.10-dev) - 12/06/2020`,
    content: (
      <>
        <>
          <>
            <Divider>Features</Divider>
            <p>- Development of all main screens completed</p>
          </>

          <>
            <Divider>Enhancements</Divider>

            <p>- Added main menu titles to sub menus </p>
            <p>- Sub menu icons completed where icons were available. </p>
            <p>- User logged in id and site code added to the bottom right corner of the Omega screen </p>
          </>

          <>
            <Divider>Bug Fixes</Divider>
            <p>
              OM5K-6449 - <a>https://dev.diamondkey.com/browse/OM5K-6449</a>
            </p>
            <p>
              OM5K-6448 - <a>https://dev.diamondkey.com/browse/OM5K-6448</a>
            </p>
            <p>
              OM5K-6371 - <a>https://dev.diamondkey.com/browse/OM5K-6371</a>
            </p>
            <p>
              OM5K-6364 - <a>https://dev.diamondkey.com/browse/OM5K-6364</a>
            </p>
            <p>
              OM5K-6515 - <a>https://dev.diamondkey.com/browse/OM5K-6515</a>
            </p>
            <p>
              OM5K-6310 - <a>https://dev.diamondkey.com/browse/OM5K-6310</a>
            </p>
            <p>
              OM5K-6338 - <a>https://dev.diamondkey.com/browse/OM5K-6338</a>
            </p>
            <p>
              OM5K-6316 - <a>https://dev.diamondkey.com/browse/OM5K-6316</a>
            </p>
            <p>
              OM5K-6602 - <a>https://dev.diamondkey.com/browse/OM5K-6602</a>
            </p>
            <p>
              OM5K-6601 - <a>https://dev.diamondkey.com/browse/OM5K-6601</a>
            </p>
            <p>
              OM5K-6312 - <a>https://dev.diamondkey.com/browse/OM5K-6312</a>
            </p>
            <p>
              OM5K-6399 - <a>https://dev.diamondkey.com/browse/OM5K-6399</a>
            </p>
            <p>
              OM5K-6451 - <a>https://dev.diamondkey.com/browse/OM5K-6451</a>
            </p>
            <p>
              OM5K-6351 - <a>https://dev.diamondkey.com/browse/OM5K-6351</a>
            </p>
            <p>
              OM5K-6194 - <a>https://dev.diamondkey.com/browse/OM5K-6194</a>
            </p>
            <p>
              OM5K-6176 - <a>https://dev.diamondkey.com/browse/OM5K-6176</a>
            </p>
            <p>
              OM5K-6117 - <a>https://dev.diamondkey.com/browse/OM5K-6117</a>
            </p>
            <p>
              OM5K-6109 - <a>https://dev.diamondkey.com/browse/OM5K-6109</a>
            </p>
            <p>
              OM5K-6086 - <a>https://dev.diamondkey.com/browse/OM5K-6086</a>
            </p>
            <p>
              OM5K-6450 - <a>https://dev.diamondkey.com/browse/OM5K-6450</a>
            </p>
            <p>
              OM5K-6489 - <a>https://dev.diamondkey.com/browse/OM5K-6489</a>
            </p>
            <p>
              OM5K-6513 - <a>https://dev.diamondkey.com/browse/OM5K-6513</a>
            </p>
            <p>
              OM5K-6519 - <a>https://dev.diamondkey.com/browse/OM5K-6519</a>
            </p>
            <p>
              OM5K-6440 - <a>https://dev.diamondkey.com/browse/OM5K-6440</a>
            </p>
            <p>
              OM5K-5394 - <a>https://dev.diamondkey.com/browse/OM5K-5394</a>
            </p>
            <p>
              OM5K-6104 - <a>https://dev.diamondkey.com/browse/OM5K-6104</a>
            </p>
            <p>
              OM5K-6120 - <a>https://dev.diamondkey.com/browse/OM5K-6120</a>
            </p>
            <p>
              OM5K-6196 - <a>https://dev.diamondkey.com/browse/OM5K-6196</a>
            </p>
            <p>
              OM5K-6309 - <a>https://dev.diamondkey.com/browse/OM5K-6309</a>
            </p>
            <p>
              OM5K-6314 - <a>https://dev.diamondkey.com/browse/OM5K-6314</a>
            </p>
            <p>
              OM5K-6327 - <a>https://dev.diamondkey.com/browse/OM5K-6327</a>
            </p>
            <p>
              OM5K-6335 - <a>https://dev.diamondkey.com/browse/OM5K-6335</a>
            </p>
          </>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.0.9-dev) - 09/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Movement Nomination Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Versioning </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the bug fixes in the version document on Confluence.</p>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.8.0-dev) - 05/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Load Schdules Screen Completion</p>
          <p>- Favourites Function Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Overview screen chart legend moved to the right hand side to help with spacing. </p>
          <p>
            - Base Product Storage & Currrent Folio Throughput now has the ability to filter by Base
            Classification.
          </p>
          <p>- Weekly Throughput now has a Linear and Logarithmic Mode. </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.7.0-dev) - 02/06/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Companies Screen Completion</p>
          <p>- Delivery Details Completion</p>
          <p>- Ability To Search the Pages</p>
          <p>- Delivery Details Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Ability To Toggle Between Classes </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.6.0-dev) - 29/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Load Bays Completion</p>
          <p>- Drawer Products Completion </p>
          <p>- Order Listings Completion </p>
          <p>- New Menu Structure </p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- New Icons for the Menu</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.5.0-dev) - 26/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Allocatioms Screen Completion</p>
          <p>- Folio Scheduling Completion </p>
          <p>- Customers Completion </p>
          <p>- Addresses Completion </p>
          <p>- Equipment Types Completion </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.4.0-dev) - 22/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Gate Permission Screen Completion</p>
          <p>- Time Codes Screen Completion </p>
          <p>- Tank Groups Screen Completion </p>
          <p>- Partnership Screen Completion </p>
          <p>- Delivery Locations Screen Completion </p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Increased Menu Icon Sizes</p>

          <p>- Background color change to match the existing OMEGA Backend. </p>

          <p>- Login Page Changes to match the design specifications</p>

          <p>- Home Page Changes to match the design specifications</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.3.0-dev) - 15/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Area Screen Completion</p>
          <p>- Site Configuration and Features Completion</p>
          <p>- Events and Warnings Completion</p>
          <p>- User Profile Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Site Configuration Hook Added to Aid with Application State across different sites.</p>

          <p>- Better Error Messages Directly Coming from PHP. </p>

          <p>- EULA and Copyright Notice Redirect Added to the Settings Bar.</p>

          <p>- Background Color Changed to fit the document provided by management.</p>
        </>

        <>
          <Divider>Bug Fixes</Divider>
          <p>- SVG Icons showing up smaller than intended of Firefox and Edge now fixed.</p>
          <p>- Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },

  {
    title: `Release Version Notes (10.2.0-dev) - 12/05/2020`,
    content: (
      <>
        <>
          <Divider>Features</Divider>

          <p>- Partners Screen Completion</p>
          <p>- Key Reader Devices Completion</p>
          <p>- Product Groups Screen Completion</p>

          <p>- Dashboard Screen Home Section Completion</p>
          <p>- Dashboard Overview Section Completion</p>
        </>

        <>
          <Divider>Enhancements</Divider>

          <p>- Release Notes Tabs Added</p>

          <p>- Bigger Icons and Menu Structure Changed to Support Better Viewing.</p>
          <p>
            - Home Menu Buttons Positioed Differently Compared to the previous version to help with
            accessibility
          </p>
        </>

        <>
          <Divider>Bug Fixes</Divider>

          <p> Please Refer to all the tasks marked "To Be Tested" on JIRA.</p>
        </>
      </>
    ),
  },
];

const ReleaseNotes = () => {
  return (
    <Collapse defaultActiveKey={['0']}>
      {data.map((entry, index) => (
        <Panel header={entry.title} key={index} forceRender>
          {entry.content}
        </Panel>
      ))}
    </Collapse>
  );
};

export default ReleaseNotes;
