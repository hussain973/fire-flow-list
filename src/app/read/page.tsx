
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReadPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
             <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4 md:hidden">
                    <h1 className="font-headline text-2xl font-bold text-primary neon-glow">Read Me</h1>
                </header>
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>How to Enable Alarms & Notifications</CardTitle>
                            <CardDescription>Instructions in different languages on how to set up task reminders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>English</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 text-base">
                                            <p className="font-semibold">Here’s how to enable alarms and notifications for your tasks:</p>
                                            <ol className="list-decimal list-inside space-y-2">
                                                <li>Go to the <span className="font-semibold text-primary">Settings</span> page.</li>
                                                <li>Click on the <span className="font-semibold text-primary">"Enable Notifications"</span> button.</li>
                                                <li>Your browser will ask for permission. Click <span className="font-semibold">"Allow"</span>. This is a one-time step.</li>
                                                <li>When creating or editing a task, set a specific <span className="font-semibold">date and time</span>.</li>
                                            </ol>
                                            <p className="text-sm text-muted-foreground pt-2">
                                                <span className="font-semibold">Important:</span> For the notification and alarm to work, the app must be open in a browser tab.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Roman Urdu</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 text-base">
                                            <p className="font-semibold">Apne tasks ke liye alarms aur notifications enable karne ka tarika yeh hai:</p>
                                            <ol className="list-decimal list-inside space-y-2">
                                                <li><span className="font-semibold text-primary">Settings</span> page par jaayein.</li>
                                                <li><span className="font-semibold text-primary">"Enable Notifications"</span> button par click karein.</li>
                                                <li>Aapka browser ijazat maangega. <span className="font-semibold">"Allow"</span> par click karein. Yeh sirf ek baar karna hoga.</li>
                                                <li>Task banate ya edit karte waqt, ek makhsoos <span className="font-semibold">tareekh (date) aur waqt (time)</span> set karein.</li>
                                            </ol>
                                            <p className="text-sm text-muted-foreground pt-2">
                                                <span className="font-semibold">Zaroori Baat:</span> Notification aur alarm ke kaam karne ke liye, app ka browser tab mein khula hona zaroori hai.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Hindi (हिन्दी)</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 text-base">
                                            <p className="font-semibold">अपने कार्यों के लिए अलार्म और सूचनाएं सक्षम करने का तरीका यहां दिया गया है:</p>
                                            <ol className="list-decimal list-inside space-y-2">
                                                <li><span className="font-semibold text-primary">सेटिंग्स (Settings)</span> पेज पर जाएं।</li>
                                                <li><span className="font-semibold text-primary">"सूचनाएं सक्षम करें" (Enable Notifications)</span> बटन पर क्लिक करें।</li>
                                                <li>आपका ब्राउज़र अनुमति मांगेगा। <span className="font-semibold">"अनुमति दें" (Allow)</span> पर क्लिक करें। यह केवल एक बार करना होगा।</li>
                                                <li>कोई कार्य बनाते या संपादित करते समय, एक विशिष्ट <span className="font-semibold">तिथि (date) और समय (time)</span> निर्धारित करें।</li>
                                            </ol>
                                            <p className="text-sm text-muted-foreground pt-2">
                                                <span className="font-semibold">महत्वपूर्ण:</span> सूचना और अलार्म के काम करने के लिए, ऐप को ब्राउज़र टैब में खुला होना चाहिए।
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
