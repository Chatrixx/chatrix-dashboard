import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Info,
  WebcamIcon as ChatIcon,
  Loader2,
} from "lucide-react";
import MainLayout from "@/components/custom/layout/main-layout";
import TotalPaymentsView from "@/views/clientDetails/total-payments-view";
import NewPaymenstView from "@/views/clientDetails/new-payments-view";
import InvoiceHistoryView from "@/views/clientDetails/invoice-history-view";
import ServicePriceHistoryView from "@/views/clientDetails/service-price-history-view";
import CurrentTreatmentsView from "@/views/clientDetails/current-treatments-view";
import CompletedTreatmentsView from "@/views/clientDetails/completed-treatments-view";
import TreatmentHistoryView from "@/views/clientDetails/treatment-history-view";
import UpcomingAppointmentsView from "@/views/clientDetails/upcoming-appointments-view";
import useClientData from "@/hooks/data/use-client-data";
import { getReadableDate } from "@/util/date";
import ChatHistoryView from "@/views/clientDetails/chat-history-view";
import CustomerTimelineView from "@/views/clientDetails/customer-timeline-view";
import CustomerSummaryView from "@/views/clientDetails/customer-summary-view";
import CustomerContactInformationView from "@/views/clientDetails/customer-contact-information-view";
import CustomInstagramIconColored from "@/assets/icons/CustomInstagramIconColored";
import Link from "next/link";
import CustomWhatsappIconOutline from "@/assets/icons/CustomWhatsappIconOutline";
import { convertPhone } from "@/util/phone";

export default function CustomerDetail() {
  const params = useParams();
  const { data, isFetching, refetch } = useClientData({ id: params.id });

  if (isFetching) {
    return (
      <Loader2 className="absolute top-1/2 left-1/2 h-10 w-10 animate-spin text-gray-500" />
    );
  }
  return (
    <div className="container mx-auto py-6">
      {/* Customer Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage
              src={data?.profile_pic || "/placeholder.svg"}
              alt={data?.full_name}
            />
            <AvatarFallback>
              {data?.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{data?.full_name}</h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <Badge variant="outline" className="text-xs">
                Müşteri ID: {params?.id}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          {/* <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Ara
          </Button> */}
          {data?.phone && (
            <Link
              href={`https://wa.me/${convertPhone(data?.phone)}`}
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-green-500 text-white hover:bg-green-700 hover:text-white"
              >
                <CustomWhatsappIconOutline className="h-4 w-4" />
                Mesaj
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="general" className="w-full">
        {/* TODO: increase grid cols according to <TabsTrigger> number */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general" className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Genel Bilgiler
          </TabsTrigger>
          {/* <TabsTrigger value="appointments" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Randevular
          </TabsTrigger> */}
          {/* <TabsTrigger value="treatments" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Tedaviler
          </TabsTrigger> */}
          {/* <TabsTrigger value="payments" className="flex items-center">
            <PaymentIcon className="h-4 w-4 mr-2" />
            Ödemeler
          </TabsTrigger> */}
          <TabsTrigger value="chats" className="flex items-center">
            <ChatIcon className="h-4 w-4 mr-2" />
            Görüşmeler
          </TabsTrigger>
        </TabsList>

        {/* General Info Tab */}
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <CustomerContactInformationView data={data} />
            </div>
            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Problem/Question Summary */}
              <CustomerSummaryView data={data} refetch={refetch} />

              {/* Customer Timeline */}
              {false && <CustomerTimelineView data={data} />}
            </div>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <UpcomingAppointmentsView customer={data} />

            {/* Appointment History */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Randevu Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6 ml-8">
                    {data?.portfolio?.appointments?.map((appointment) => (
                      <div key={appointment.id} className="relative">
                        <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
                          <div>
                            <h4 className="font-medium">{appointment.type}</h4>
                            <p className="text-sm text-gray-500">
                              {getReadableDate(appointment.date)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "Onaylandı"
                                ? "default"
                                : "outline"
                            }
                            className="mt-2 md:mt-0"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{appointment.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Treatments Tab */}
        <TabsContent value="treatments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Treatments */}
            <CurrentTreatmentsView customer={data} />

            {/* Completed Treatments */}
            <CompletedTreatmentsView customer={data} />

            {/* Treatment History */}
            <TreatmentHistoryView customer={data} />
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left column: stack payment summary and new payments vertically */}
            <div className="flex flex-col gap-6">
              <TotalPaymentsView customer={data} isLoading={isFetching} />
              <NewPaymenstView />
            </div>
            {/* Right column: invoice history */}
            <div>
              <ServicePriceHistoryView customer={data} />
            </div>
          </div>
          <InvoiceHistoryView customer={data} />
        </TabsContent>

        {/* Chats Tab */}
        <TabsContent value="chats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Channels */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">İletişim Kanalları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.channels?.instagram && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                          <CustomInstagramIconColored className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Instagram</h4>
                          <p className="text-xs text-gray-500">
                            @
                            {
                              data?.channels?.instagram?.profile_info
                                ?.ig_username
                            }
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                        {data?.channels?.instagram?.messages?.length} mesaj
                      </Badge>
                    </div>
                  )}

                  {data?.channels?.whatsapp && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">WhatsApp</h4>
                          <p className="text-xs text-gray-500">{data?.phone}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {data?.channels?.whatsapp?.messages?.length} mesaj
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat History */}
            <ChatHistoryView data={data} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

CustomerDetail.getLayout = (children) => <MainLayout>{children}</MainLayout>;
