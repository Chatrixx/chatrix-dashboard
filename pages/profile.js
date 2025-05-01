import MainLayout from "@/components/custom/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TestChatView from "@/views/profile/test-chat-view";
import { Info } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const tabs = [
    {
      value: "chat-test",
      label: "Sohbet Testi",
      title: "Sohbet Testi",
      tooltip:
        "Aşağıdaki sohbet kutucuğundan size danışan kullanıcılarınızın otomatik asistan tarafından nasıl cevaplandığını görebilirsiniz.",
    },
    {
      value: "settings",
      label: "Ayarlar",
      title: "Ayarlar",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs
        onValueChange={(val) => {
          setActiveTab(tabs.find((t) => t.value === val));
        }}
        value={activeTab.value}
        defaultValue="chat-test"
        className="ml-auto"
      >
        <div className="flex">
          <div className="flex items-center gap-2 mb-4 px-1">
            <h1 className="text-3xl font-bold">{activeTab.title}</h1>
            {activeTab.tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipContent className="max-w-72 p-2">
                    {activeTab.tooltip}
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <Info size={20} className="cursor-pointer" />
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <TabsList className="ml-auto">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="chat-test">
          <TestChatView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

ProfilePage.getLayout = (children) => <MainLayout>{children}</MainLayout>;
