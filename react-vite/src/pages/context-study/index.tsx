import Heading from "./heading";
import Section from "./section";

import "./index.scss";

function ContextStudy() {
   return (
      <div className="context-wrap">
         <Section value={1}>
            <Heading>我是大标题</Heading>
            <Section value={2}>
               <Heading>我是副标题</Heading>
               <Heading>我是副标题</Heading>
               <Heading>我是副标题</Heading>
               <Section value={3}>
                  <Heading>我是小标题</Heading>
                  <Heading>我是小标题</Heading>
                  <Heading>我是小标题</Heading>
                  <Section value={4}>
                     <Heading>我是正文</Heading>
                     <Heading>我是正文</Heading>
                     <Heading>我是正文</Heading>
                  </Section>
               </Section>
            </Section>
         </Section>
      </div>
   );
}

export default ContextStudy;
